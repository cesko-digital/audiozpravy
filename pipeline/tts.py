from azure.cognitiveservices.speech import AudioDataStream, SpeechConfig, SpeechSynthesizer, SpeechSynthesisOutputFormat
from azure.cognitiveservices.speech.audio import AudioOutputConfig

import boto3
import os
from botocore.exceptions import ClientError
import unicodedata
import re
from config import CONFIG

def title_to_filename(title: str):
    filename = unicodedata.normalize('NFKD', title)
    filename = re.sub('[^\w\s-]', '', filename).strip().lower()
    filename = re.sub('[-\s]+', '_', filename)

    return filename + ".wav"

def process_audio(title: str, content: str) -> str:
    
    speech_config = SpeechConfig(CONFIG['azureKey'], CONFIG['azureRegion'])
    synthesizer = SpeechSynthesizer(speech_config = speech_config, audio_config = None)

    result = synthesizer.speak_ssml_async('<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US"><voice name="cs-CZ-AntoninNeural"><prosody rate="0%" pitch="0%">' + title + '. ' + content + '</prosody></voice></speak>').get()
    stream = AudioDataStream(result)
    
    filename = title_to_filename(title)
    stream.save_to_wav_file("audio/" + filename)

    return filename

def upload_to_s3():
    s3_client = boto3.client(
        's3',
        aws_access_key_id=CONFIG['awsAccessKey'],
        aws_secret_access_key=CONFIG['awsSecretKey']
    )

    session = boto3.Session(
        aws_access_key_id=CONFIG['awsAccessKey'],
        aws_secret_access_key=CONFIG['awsSecretKey'],
    )

    try:
        session.resource('s3').Bucket(CONFIG['s3Bucket']).objects.all().delete()
        session.resource('s3').Bucket(CONFIG['s3BucketAudio']).objects.all().delete()

        arr = os.listdir('s3')
        
        for file in arr:
            if (file == "articles"):
                continue
            
            s3_client.upload_file('s3/' + file, CONFIG['s3Bucket'], file)

        arr = os.listdir('audio')
        
        for file in arr:
            s3_client.upload_file('audio/' + file, CONFIG['s3BucketAudio'], file, ExtraArgs={'ACL':'public-read'})
    except ClientError as e:
        logging.error(e)
