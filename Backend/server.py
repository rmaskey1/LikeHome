import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
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

users_ref = db.collection("users")
docs = users_ref.stream()

for doc in docs:
    print(f"{doc.id} => {doc.to_dict()}")

# Initialize Flask Server
app = Flask(__name__)
if __name__ == '__main__':
    #app.debug = True
    app.run(host='0.0.0.0', port=8000)