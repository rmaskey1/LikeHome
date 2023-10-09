import firebase_admin
import database
# import pyrebase
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from database import addUser

app = Flask(__name__)

@app.route('/')
def home():
    return redirect(url_for("user_selection"))

# User Type Selection Function
@app.route('/user_selection', methods=['POST', 'GET'])
def user_selection():
    if request.method == "POST":
        usertype = request.form['usertype'] # User chooses what type of user they are (guest or hotel)
        if usertype == "guest": # If the input is 'guest', redirect to guest signup page
            return redirect(url_for("guest_signup"))
        elif usertype == "hotel": # If the input is 'hotel', redirect to hotel signup page
            return redirect(url_for("hotel_signup"))
        else: # Else, nothing was chosen
            return render_template("user_selection.html")
    else:
        return render_template("user_selection.html") # Start on the user selection page by default

# Guest Sign Up Function   
@app.route('/guest_signup', methods=['POST', 'GET'])
def guest_signup():
    # firebase_admin.get_app()
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
                addUser(email, phone, password, firstName, lastName, "guest") # Adds user to database
                return redirect(url_for("home")) # Redirects to login page
    else:
        return render_template("guest_signup.html", error=False) # Returns signup.html page if no POST request is made yet

@app.route('/hotel_signup', methods=['POST', 'GET'])
def hotel_signup():
    # firebase_admin.get_app()
    if request.method == "POST":
        # Get form data
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        hotelName = request.form['hotelName']
        email = request.form['email']
        password = request.form['password']
        phone = request.form['phone']

        # Insert data into the database
        try: # Check if entered email is already in use
            usr = auth.get_user_by_email(email) # Returns auth.UserNotFoundError if email does not exist, jumps to first except block
            print("Email already in use.")
            return render_template("hotel_signup.html", emailError=True) # Returns signup.html page with error message
        except auth.UserNotFoundError:
            try: # Check if entered phone number is already in use
                usr = auth.get_user_by_phone_number(phone) # Returns auth.UserNotFoundError if email does not exist, jumps to second except block
                print("Phone number already in use.")
                return render_template("hotel_signup.html", phoneError=True) # Returns signup.html page with error message
            except auth.UserNotFoundError:
                addUser(email, phone, password, firstName, lastName, "hotel", hotelName) # Adds user to database
                return redirect(url_for("home")) # Redirects to login page
    else:
        return render_template("hotel_signup.html", error=False) # Returns hotel_signup.html page if no POST request is made yet

if __name__ == '__main__':
    #app.debug = True
    app.run()