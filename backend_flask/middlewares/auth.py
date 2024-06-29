import json
import time
import urllib.request

from functools import wraps

import requests
from flask import request, jsonify
from jose import jwt, jwk
from jose.utils import base64url_decode

from config_parser.config import config

cognito_keys_url = 'https://cognito-idp.{}.amazonaws.com/{}/.well-known/jwks.json'.format(config["AWS_REGION"], config[
    "AWS_COGNITO_USER_POOL_ID"])

with urllib.request.urlopen(cognito_keys_url) as f:
    jwk_res = f.read()
keys = json.loads(jwk_res.decode('utf-8'))['keys']


def login_required(decorated_function):
    @wraps(decorated_function)
    def wrapper(*args, **kwargs):
        id_token = request.headers.get('Authorization', None)
        if id_token is None:
            return jsonify({'message': 'Missing Authorization'}), 401
        id_token = id_token.split(' ')[1]

        try:
            headers = jwt.get_unverified_headers(id_token)
            kid = headers['kid']
            # get the matching key from the downloaded public keys
            key_index = -1
            for i in range(len(keys)):
                if kid == keys[i]['kid']:
                    key_index = i
                    break
            if key_index == -1:
                raise Exception('kid not found')

            public_key = jwk.construct(keys[key_index])
            message, encoded_signature = str(id_token).rsplit('.', 1)
            decoded_signature = base64url_decode(encoded_signature.encode('utf-8'))
            if not public_key.verify(message.encode("utf8"), decoded_signature):
                raise Exception('Could not verify token')

            claims = jwt.get_unverified_claims(id_token)
            if time.time() > claims['exp']:
                raise Exception('Authentication failed. Expired')
            if claims['token_use'] == 'id' and (claims['aud'] == config["AWS_COGNITO_CLIENT_ID"]):
                setattr(request, 'user_id', claims['sub'])
                return decorated_function(*args, **kwargs)

            raise Exception('Authentication Failed. Token use not matching or issuer not matching')

        except Exception as e:
            return jsonify("Authentication failed"), 401

    return wrapper
