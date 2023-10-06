import firebase_admin
import database
# import pyrebase
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from database import addUser

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


@app.route('/')
def home():
    return redirect(url_for("user_selection"))

@app.route('/signup', methods=['POST', 'GET'])
def user_selection():
    if request.method == "POST":
        usertype = request.form['usertype']
        if usertype == "guest":
            return redirect(url_for("guest_signup"))
        elif usertype == "hotel":
            return redirect(url_for("guest_signup"))
        else:
            return render_template("user_selection.html")
    else:
        return render_template("user_selection.html")
    
@app.route('/guest_signup', methods=['POST', 'GET'])
def guest_signup():
    firebase_admin.get_app()
    if request.method == "POST":
        # Get form data
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        email = request.form['email']
        password = request.form['password']
        phone = request.form['phone']

        # Insert data into the database
        try: # Check if entered email is already in use
            usr = auth.get_user_by_email(email) # Returns auth.UserNotFoundError if email does not exist, jumps to first except block
            print("Email already in use.")
            return render_template("guest_signup.html", emailError=True) # Returns signup.html page with error message
        except auth.UserNotFoundError:
            try: # Check if entered phone number is already in use
                usr = auth.get_user_by_phone_number(phone) # Returns auth.UserNotFoundError if email does not exist, jumps to second except block
                print("Phone number already in use.")
                return render_template("guest_signup.html", phoneError=True) # Returns signup.html page with error message
            except auth.UserNotFoundError:
                dispName = firstName + " " + lastName
                addUser(email, phone, password, dispName) # Adds user to database
                return redirect(url_for("home")) # Redirects to login page
    else:
        return render_template("guest_signup.html", error=False) # Returns signup.html page if no POST request is made yet

if __name__ == '__main__':
    #app.debug = True
    app.run()