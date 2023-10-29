import firebase_admin
import database
# import pyrebase
from firebase_admin import credentials, firestore, auth
from flask import Flask, abort, make_response, request, jsonify, render_template, redirect, url_for, session
from flask_cors import CORS
from database import addUser, addHotelInfo, pyrebase_auth, db, getUid, addBooking, roomBooked, checkIfRoomExists, getGuestBookedRooms, getAccountType
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

# No payment fields yet
@app.route('/bookings', methods=['GET', 'POST']) # Expecting uid and rid passed in as variable
def bookings():
    if request.method == 'POST':
        rid = request.args['rid'] 
        gid = getUid()
        data = request.get_json()
        if roomBooked(rid):
            abort(make_response(jsonify(message="Sorry, this room is already booked"), 409))
        booking = addBooking(gid, rid, data['startDate'], data['endDate'], data['numGuest'])
        return jsonify(booking)
    
    # Get guest's mybookings
    if request.method == 'GET':
        # Can return empty array if there are no bookings
        if getAccountType() == 'hotel':
            abort(make_response(jsonify(message="User is not a guest!"), 404))
        bookedRoom_ids = getGuestBookedRooms(getUid())
        bookedRooms = []
        for id in bookedRoom_ids:
            # Each id corresponds to the rid of a booked room
            if db.collection("room").document(id).get().exists == True:
                bookedRoom_data = db.collection("room").document(id).get().to_dict()
                bookedRoom_data['rid'] = id
                bookedRooms.append(bookedRoom_data)
        return jsonify(bookedRooms)
    
# No get function, must call put/delete methods from frontend to work
# No payment fields yet
@app.route('/bookings/<rid>', methods=['GET','PUT', 'DELETE'])
def modify_bookings(rid):
# test if rid exists
    if checkIfRoomExists(rid) == False:
        abort(make_response(jsonify(message="Rid and room does not exist"), 400))

    # Modify Booking Here
    if request.method == 'PUT':
        booking_ref = db.collection("booking")
        # Search for the specific booking and update it 
        query_ref = booking_ref.where("rid", "==", rid).where("gid", "==", getUid())
        docs = query_ref.stream()
        # Added updated data here, 4 is sample data
        updatedData = {
            "numGuest": 4
        }
        for doc in docs:
            doc.reference.update(updatedData)
        return jsonify(message= "Modification Successfull")

    # Cancel Booking Here
    elif request.method == 'DELETE':
        booking_ref = db.collection("booking")
        # Search for the specific booking and delete it
        query_ref = booking_ref.where("rid", "==", rid).where("gid", "==", getUid())
        docs = query_ref.stream()
        for doc in docs:
            doc.reference.delete()
        # Delete the booked room in guest's bookedRooms array
        uid = getUid()
        user_ref = db.collection('user').document(uid)
        user_ref.update({"bookedRooms": firestore.ArrayRemove([rid])})

        return jsonify(message= "Deletion Successfull")
        
@app.route('/query', methods=['POST', 'GET'])
def queryByRmAttribute():
    try:
        if request.method == 'POST':
            # Get JSON data from the frontend
            data = request.get_json()
            
            #amneties
            amenities=data['amenities']
            
            query = db.collection("room")
            #query amenities if they are true
            for amenity in amenities:
                query = db.collection("room").where(amenity, '==', True).get()
              
            #the other rm attributes
            bathrooms = data['bathrooms']
            bedType = data['bedType']
            beds = data['beds']
            guests = data['guests']
            minPrice = data['minPrice']
            maxPrice = data['maxPrice']
            
            
            
            #this part checks if each attribute exists or not
            
            if 'bathrooms' in data:
                query = query.where('bathrooms', '<=', bathrooms).get()
            if 'bedType' in data:
                query = query.where('bedType', '==', bedType).get()
            if 'beds' in data:
                query = query.where('beds', '<=', beds).get()
            if 'guests' in data:
                query = query.where('guests', '==', guests).get()
            if 'minPrice' in data:
                query = query.where('minPrice', '<=', minPrice).get()
            if 'maxPrice' in data:
                query = query.where('maxPrice', '==', maxPrice).get()

            
            results = query.stream()
            print(results)
            matching_rooms = []

            for room in results:
                matching_rooms.append(room.to_dict())

            return jsonify(matching_rooms)

        else:
            return jsonify([])

    except Exception as e:
        print("Error querying rooms:", e)
        return jsonify([])

if __name__ == '__main__':
    app.debug = True
    app.run()
