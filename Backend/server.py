import firebase_admin
import database
# import pyrebase
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_cors import CORS
from database import addUser, addHotelInfo


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return redirect(url_for("user_selection"))

from guest import guest_modification_func, guest_login_func
guest_login_func(app)
guest_modification_func(app)

from hotel import hotel_modification_func, hotel_func
hotel_modification_func(app)
hotel_func(app)

# User Type Selection Function
@app.route('/user_selection', methods=['POST', 'GET'])
def user_selection():
    if request.method == "POST":
        usertype = request.form['usertype'] # User chooses what type of user they are (guest or hotel)
        if usertype == "guest": # If the input is 'guest', redirect to guest signup page
            return redirect(url_for("guest_signup"))
        elif usertype == "hotel": # If the input is 'hotel', redirect to hotel signup page
            return redirect(url_for("hotel_signup"))
        elif usertype == "guest_login": # If the input is 'hotel', redirect to hotel signup page
            return redirect(url_for("guest_login"))
        elif usertype == "hotel_login": # If the input is 'hotel', redirect to hotel signup page
            return redirect(url_for("hotel_login"))
        else: # Else, nothing was chosen
            return render_template("user_selection.html")
    else:
        return render_template("user_selection.html") # Start on the user selection page by default

# Guest Sign Up Function   
@app.route('/signup', methods=['POST', 'GET'])
def signup():
    # firebase_admin.get_app()
    if request.method == "POST":
        # Get form data
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        email = request.form['email']
        password = request.form['password']
        phone = request.form['phone']
        usertype = request.form['usertype'] # User chooses what type of user they are (guest or hotel)

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
                if usertype == "guest": # If the input is 'guest', redirect to guest signup page
                    addUser(email, phone, password, firstName, lastName, "guest")
                    return redirect(url_for("guest_login"))
                if usertype == "hotel": # If the input is 'hotel', redirect to hotel signup page
                    user = addUser(email, phone, password, firstName, lastName, "hotel")
                    return redirect(url_for("hotel_signup", userId=user.uid))
                if usertype == "admin": # If the input is 'guest', redirect to guest signup page
                    addUser(email, phone, password, firstName, lastName, "admin")
                    return redirect(url_for("guest_login"))
                 # Adds user to database
                return render_template("guest_signup.html", error=False) # Redirects to login page
    else:
        return render_template("signup.html", error=False) # Returns signup.html page if no POST request is made yet

@app.route('/hotel_signup/<uid>', methods=['POST', 'GET'])
def hotel_signup(userId):
    # firebase_admin.get_app()
    if request.method == "POST":
        # Get form data
        hotelName = request.form['hotelName']
        street = request.form['email']
        city = request.form['password']
        zip = request.form['phone']
        state = request.form['phone']
        country = request.form['phone']
        addHotelInfo(userId, hotelName, street, city, zip, state, country)
        return redirect(url_for("guest_login"))
    else:
        return render_template("hotel_signup.html", error=False) # Returns hotel_signup.html page if no POST request is made yet

if __name__ == '__main__':
    app.debug = True
    app.run()

