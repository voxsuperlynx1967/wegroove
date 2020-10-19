from werkzeug.utils import secure_filename
import boto3
import os
from flask import Blueprint, jsonify, request, session


photo_routes = Blueprint('photo', __name__)

BUCKET_URL = os.environ.get('BUCKET_URL')
BUCKET_NAME = os.environ.get('BUCKET_NAME')
ACCESS_ID = os.environ.get('AWS_ACCESS_KEY_ID')
ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
REGION_NAME = os.environ.get('AWS_REGION_NAME')

s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=ACCESS_ID,
aws_secret_access_key=ACCESS_KEY)


#  unprotected method of transferring to public bucket:
# s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=ACCESS_ID,
#                     aws_secret_access_key=ACCESS_KEY)


@photo_routes.route('/', methods=['POST'])
def load_files():
  if request.method == 'POST':
    user_id = request.form.get('id', None)
    file = request.files["file"]
    file.filename = secure_filename(file.filename)
    folder = f'{user_id}/files/'
    file_path = folder + file.filename
    s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={"ContentType": file.content_type, 'ACL': 'public-read' })
    external_link = f'{BUCKET_URL}{folder}{file.filename}'
    print(BUCKET_URL)
    return external_link
