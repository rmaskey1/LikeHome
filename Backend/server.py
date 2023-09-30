import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("C:\\Users\\haily\\Documents\\serviceAccountKey.json")
firebase_admin.initialize_app(cred)
