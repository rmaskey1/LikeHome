import firebase_admin
import database
import pyrebase
import requests
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for
from database import addUser, guestLogin, updatePhone, updateEmail, updateName, updatePassword, getUid

# -----------IMPORTANT-------------
# 1. On your terminal execute this command "pip install firebase-admin"
# 2. Also install Flask: "pip install flask"
# 3. Download serviceAccountKey.json under resources in our discord channel
# 4. Drag that file and add it into backend folder if you have not done so
# 5. Make sure you are in cmpe165-likehome directory and not Backend directory
# 6. Run the python file
# cred = credentials.Certificate("./serviceAccountKey.json")

# # Application Default credentials are automatically created.
# app = firebase_admin.initialize_app(cred)
# db = firestore.client()

# users_ref = db.collection("users")
# docs = users_ref.stream()

# for doc in docs:
#     print(f"{doc.id} => {doc.to_dict()}")

# Initialize Flask Server
app = Flask(__name__)
app.debug = True

from guest import guest_modification_func, guest_login_func
guest_login_func(app)
guest_modification_func(app)

@app.route('/')
def home():
    return redirect(url_for("user_selection"))

@app.route('/signup', methods=['POST', 'GET'])
def user_selection():
    if request.method == "POST":
        usertype = request.form['usertype']
        if usertype == "change":
            return redirect(url_for("guest_modification"))
        elif usertype == "login":
            return redirect(url_for("guest_login"))
        else:
            return render_template("user_selection.html")
    else:
        return render_template("user_selection.html")
    


if __name__ == '__main__':
    #app.debug = True
    app.run()