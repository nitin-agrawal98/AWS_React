import time
import json
import boto3
from botocore.exceptions import ClientError


def lambda_handler(event, context):
    password = event['password']
    email = event['email']
    given_name = event['given_name']
    family_name = event['family_name']
    user_pool_id = event['user_pool_id']

    user_attributes = [
        {'Name': 'email', 'Value': email},
        {'Name': 'given_name', 'Value': given_name},
        {'Name': 'family_name', 'Value': family_name},
        {'Name': 'updated_at', 'Value': str(int(time.time()))}
    ]

    client = boto3.client('cognito-idp')

    try:
        response = client.admin_create_user(
            UserPoolId=user_pool_id,
            Username=email,
            UserAttributes=user_attributes,
            TemporaryPassword=password,
            MessageAction='SUPPRESS'
        )

        client.admin_set_user_password(
            UserPoolId=user_pool_id,
            Username=email,
            Password=password,
            Permanent=True
        )
        return {
            'statusCode': 200,
            'body': "User created successfully"
        }
    except ClientError as e:
        return {
            'statusCode': 400,
            'body': json.dumps(f'Error: {e.response["Error"]["Message"]}')
        }

