from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# -----------IMPORTANT-------------
# 1. Execute "pip install firebase-admin" in terminal
# 2. Execute "pip install flask" and "pip install -U flask-cors" in terminal
# 3. Download serviceAccountKey.json under resources in our discord channel
# 4. Drag that file and add it into backend folder if you have not do   ne so
# 5. Make sure you are in cmpe165-likehome directory and not Backend directory
# 6. Run the python file

# Initialize Firestore 


# Initialize Flask Server
app = Flask(__name__)

from hotel import hotel_func
hotel_func(app)

CORS(app)
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)

