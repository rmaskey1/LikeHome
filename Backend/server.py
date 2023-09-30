import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, jsonify

# -----------IMPORTANT-------------
# 1. On your terminal execute this command "pip install firebase-admin"
# 2. Also install Flask: "pip install flask"
# 3. Download serviceAccountKey.json under resources in our discord channel
# 4. Save the file anywhere in your computer and copy the address/path to that file
# 5. On line 13 replace the string inside Certificate with your own path to serviceAccountKey.json
# 6. Run the python file
cred = credentials.Certificate("C:\\Users\\haily\\Documents\\serviceAccountKey.json")

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app(cred)
db = firestore.client()

# Initialize Flask Server
app = Flask(__name__)
if __name__ == '__main__':
    #app.debug = True
    app.run(host='0.0.0.0', port=8000)