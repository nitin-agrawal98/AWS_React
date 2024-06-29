import json

import boto3
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

from config_parser.config import config
from middlewares.auth import login_required

app = Flask(__name__)
CORS(app, origins=["*"])


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data['email']
    password = data['password']
    given_name = data['given_name']
    family_name = data['family_name']
    if None in [email, password, given_name, family_name]:
        return jsonify({'error': 'Email or password or given_name or family_name is empty'}), 400
    lambda_client = boto3.client('lambda', region_name=config["AWS_REGION"])
    payload = {
        'username': email,
        'password': password,
        'given_name': given_name,
        'family_name': family_name,
        'email': email,
        'user_pool_id': config["AWS_COGNITO_USER_POOL_ID"],
    }

    response = lambda_client.invoke(
        FunctionName=config["LAMBDA_FUNCTION_NAME"],
        InvocationType='RequestResponse',
        Payload=json.dumps(payload)
    )
    response_payload = json.loads(response['Payload'].read().decode('utf-8'))
    return jsonify(response_payload), response_payload.get('statusCode', 500)


@app.route('/public', methods=['GET'])
def test_public_route():
    return jsonify("You accessed a public route")


@app.route('/private', methods=['GET'])
@login_required
def test_private_route():
    return jsonify("User with id {} accessed the private route".format(request.user_id)), 200


@app.route('/products', methods=['GET'])
@login_required
def get_products():
    response = requests.get('https://dummyjson.com/products')
    return jsonify(response.json()), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
