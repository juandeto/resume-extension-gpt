import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('resume-gpt-extension-firebase-adminsdk-sy6ct-6feaf119f8.json')
firebase = firebase_admin.initialize_app(cred)

db = firestore.client()

