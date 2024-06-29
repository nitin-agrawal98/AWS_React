import os

from dotenv import load_dotenv

load_dotenv()
config = {
    "JWT_SECRET_KEY": os.getenv("JWT_SECRET_KEY"),
    "AWS_REGION": os.getenv("AWS_REGION"),
    "AWS_COGNITO_USER_POOL_ID": os.getenv("AWS_COGNITO_USER_POOL_ID"),
    "AWS_COGNITO_CLIENT_ID": os.getenv("AWS_COGNITO_CLIENT_ID"),
    "LAMBDA_FUNCTION_NAME": os.getenv("LAMBDA_FUNCTION_NAME"),
}

