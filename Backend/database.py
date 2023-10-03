import firebase_admin
from firebase_admin import credentials, firestore, auth, exceptions
from flask import Flask, request, jsonify

# -----------IMPORTANT-------------
# 1. On your terminal execute this command "pip install firebase-admin"
# 2. Also install Flask: "pip install flask"
# 3. Download serviceAccountKey.json under resources in our discord channel
# 4. Drag that file and add it into backend folder if you have not done so
# 5. Make sure you are in cmpe165-likehome directory and not Backend directory
# 6. Run the python file
cred = credentials.Certificate("./Backend/serviceAccountKey.json")

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app(cred)
db = firestore.client()

# Function to add user to database
def addUser(email, phone, password, dispName):
    user = auth.create_user(
    email=email,
    phone_number=phone,
    password=password,
    display_name=dispName)
    print('Sucessfully created new user: {0}'.format(user.uid))

# Main method for testing
def main():
    addUser("email@email.com", "+15555555555", "password", "Mike mike")