from config import CONFIG
import boto3

session = boto3.Session(
    aws_access_key_id=CONFIG["awsAccessKey"],
    aws_secret_access_key=CONFIG["awsSecretKey"],
)

s3_client = boto3.client(
    "s3",
    aws_access_key_id=CONFIG["awsAccessKey"],
    aws_secret_access_key=CONFIG["awsSecretKey"],
)

def download_s3_files():
    for object in session.resource("s3").Bucket(CONFIG["s3Bucket"]).objects.all():
        try:
            s3_client.download_file(
                CONFIG["s3Bucket"], object.key, "s3_input/" + object.key
            )
        except:
            print("file not found")
