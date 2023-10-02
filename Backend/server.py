import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from flask import Flask, request, jsonify
from flask_cors import CORS

# -----------IMPORTANT-------------
# 1. Execute "pip install firebase-admin" on your terminal
# 2. Execute "pip install flask" and "pip install -U flask-cors" on your terminal
# 3. Download serviceAccountKey.json under resources in our discord channel
# 4. Drag that file and add it into backend folder if you have not done so
# 5. Make sure you are in cmpe165-likehome directory and not Backend directory
# 6. Run the python file

# Initialize Flask Server and enable cross origin
app = Flask(__name__)
CORS(app)
if __name__ == '__main__':
    #app.debug = True
    app.run(host='0.0.0.0', port=8000)

cred = credentials.Certificate("./Backend/serviceAccountKey.json")

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app(cred)
db = firestore.client()

# User Authentication
