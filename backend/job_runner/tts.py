import logging

from azure.cognitiveservices.speech import (
    AudioDataStream,
    SpeechConfig,
    SpeechSynthesizer,
)
from azure.cognitiveservices.speech.audio import AudioOutputConfig

import boto3
import os
from botocore.exceptions import ClientError
import unicodedata
import re
from os import environ

class CONFIG:
    azureKey: str = os.getenv('AZURE_KEY')
    azureRegion: str = os.getenv('AZURE_REGION')
    awsAccessKey: str = os.getenv('AWS_ACCESS_KEY')
    awsSecretKey: str = os.getenv('AWS_SECRET_KEY')
    s3Bucket: str = os.getenv('S3_BUCKET')
    s3BucketAudio: str = os.getenv('S3_BUCKET_AUDIO')



def title_to_filename(title: str):
    filename = unicodedata.normalize("NFKD", title)
    filename = re.sub("[^\w\s-]", "", filename).strip().lower()
    filename = re.sub("[-\s]+", "_", filename)

    return filename + ".wav"


def process_audio(title: str, content: str, temporal_storage_audio: str) -> str:
    ''' Creats audio for title and content by azure SpeechSynthesizer. AZURE_KEY and AZURE_REGION local variables need
    to be determined '''
    # from config import CONFIG
    speech_config = SpeechConfig(CONFIG.azureKey, CONFIG.azureRegion)
    synthesizer = SpeechSynthesizer(speech_config=speech_config, audio_config=None)

    result = synthesizer.speak_ssml_async(
        '<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US"><voice name="cs-CZ-AntoninNeural"><prosody rate="0%" pitch="0%">'
        + title
        + ". "
        + content
        + "</prosody></voice></speak>"
    ).get()
    stream = AudioDataStream(result)

    filename = title_to_filename(title)
    stream.save_to_wav_file(os.path.join(temporal_storage_audio, filename))
    return filename


def upload_file_to_s3(file_path: str):
    ''' Upload all files from input_path into S3'''
    # from config import CONFIG

    s3_client = boto3.client(
        "s3",
        aws_access_key_id=CONFIG.awsAccessKey,
        aws_secret_access_key=CONFIG.awsSecretKey,
    )

    session = boto3.Session(
        aws_access_key_id=CONFIG.awsAccessKey,
        aws_secret_access_key=CONFIG.awsSecretKey,
    )

    try:
        session.resource("s3").Bucket(CONFIG.s3Bucket).objects.all().delete()
        session.resource("s3").Bucket(CONFIG.s3BucketAudio).objects.all().delete()
        s3_client.upload_file("s3/" + file_path, CONFIG.s3Bucket, file_path, ExtraArgs={"ACL": "public-read"})

    except ClientError as e:
        logging.error(e)
