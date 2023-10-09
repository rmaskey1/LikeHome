import pyrebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
# ----------------IMPORTANT-------------------\
# pip install pyrebase4        run command
config = {
"apiKey": "AIzaSyBSFok_KWaBdRyXkdrqektCu8E0rYyhV5Y",
"authDomain": "innsight-87ed1.firebaseapp.com",
"projectId": "innsight-87ed1",
"databaseURL": "https://databaseName.firebaseio.com",
"storageBucket": "innsight-87ed1.appspot.com"
}
firebase = pyrebase.initialize_app(config)
pyrebase_auth = firebase.auth()

cred = credentials.Certificate("./Backend/serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()



