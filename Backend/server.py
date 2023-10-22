import firebase_admin
import database
# import pyrebase
from firebase_admin import credentials, firestore, auth
from flask import Flask, abort, make_response, request, jsonify, render_template, redirect, url_for, session
from flask_cors import CORS
from database import addUser, addHotelInfo, pyrebase_auth, db, getUid, addBooking, roomBooked
from guest import is_valid_password, is_valid_phone_number


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return redirect(url_for("user_selection"))

from guest import guest_modification_func
guest_modification_func(app)

from hotel import hotel_modification_func
hotel_modification_func(app)

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
    # # firebase_admin.get_app()
    # if request.method == "POST":
    #     # Get form data
    #     firstName = request.form['firstName']
    #     lastName = request.form['lastName']
    #     email = request.form['email']
    #     password = request.form['password']
    #     phone = request.form['phone']
    #     usertype = request.form['usertype'] # User chooses what type of user they are (guest or hotel)
    data = request.get_json()  # Assuming JSON data is sent
    firstName = data['firstname']
    lastName = data['lastname']
    email = data['email']
    password = data['password']
    phone = data['phone']
    usertype = data['role']

    try: # Check if entered email is already in use
        usr = auth.get_user_by_email(email) # Returns auth.UserNotFoundError if email does not exist, jumps to first except block
        print("Email already in use.")
        abort(make_response(jsonify(message="Email already in use."), 409))
    except auth.UserNotFoundError:
        try: # Check if entered phone number is already in use
            if is_valid_phone_number(phone): # Check if phone number is valid
                usr = auth.get_user_by_phone_number(phone) # Returns auth.UserNotFoundError if email does not exist, jumps to second except block
                print("Phone number already in use.")
                abort(make_response(jsonify(message="Phone number already in use."), 418))
            else: # Invalid phone number error
                abort(make_response(jsonify(message="Please enter valid phone number"), 419))
        except auth.UserNotFoundError:
            if is_valid_password(password): # Check if password is valid
                if usertype == "guest": # If the input is 'guest', redirect to guest signup page
                    user = addUser(email, phone, password, firstName, lastName, "guest")
                    return jsonify({"uid": user.uid, "usertype": "guest"})
                if usertype == "hotel": # If the input is 'hotel', redirect to hotel signup page
                    user = addUser(email, phone, password, firstName, lastName, "hotel")
                    return jsonify({"uid": user.uid, "usertype": "hotel"})
                if usertype == "admin": # If the input is 'guest', redirect to guest signup page
                    user = addUser(email, phone, password, firstName, lastName, "admin")
                    return jsonify({"uid": user.uid, "usertype": "admin"})
            else: # Invalid password error
                abort(make_response(jsonify(message="Password should be at least 6 characters"), 400))
            
    abort(make_response(jsonify(message="User role not found."), 400))    # else:

@app.route('/hotel_signup', methods=['POST', 'GET']) # ?uid=<uid>
def hotel_signup():
    data = request.get_json()  # Assuming JSON data is sent
    userId = request.args['uid']
    hotelName = data['hotelName']
    street = data['street']
    city = data['city']
    zipcode = data['zipcode']
    state = data['state']
    country = data['country']
    hotel = addHotelInfo(userId, hotelName, street, city, zipcode, state, country)
    return jsonify(hotel)

def login_user(email, password):
    user = pyrebase_auth.sign_in_with_email_and_password(email, password)
    return user

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try: # Check if entered email is already in use
        usr = auth.get_user_by_email(data['email']) # Returns auth.UserNotFoundError if email does not exist, jumps to first except block
        
        try:
            # Authenticate the user with email and password
            userData = login_user(data['email'], data['password'])
            user_ref = db.collection("user").document(userData['localId'])
            userData['info'] = user_ref.get().to_dict()
            # Return user's information
            return jsonify(userData)
        except Exception as e:
            abort(make_response(jsonify(
                message="Your password is incorrect"
            ), 401))
    except auth.UserNotFoundError:
        print("Email does not exist.")
        abort(make_response(jsonify(message="Email does not exist"), 404))

@app.route('/booking', methods=['POST']) # Expecting uid passed in as variable
def booking():
    rid = request.args['rid']
    gid = request.args['uid'] # GID is used to refer to a guest's UID, both are the same thing
    data = request.get_json()
    if roomBooked(rid):
        abort(make_response(jsonify(message="Sorry, this room is already booked"), 409))
    gid, rid = addBooking(gid, rid, data['startDate'], data['endDate'], data['numGuest'])
    return jsonify({'uid': gid, 'rid': rid})
    

if __name__ == '__main__':
    app.debug = True
    app.run()
