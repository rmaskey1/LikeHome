from database import auth, pyrebase_auth, db
from flask import Flask, request, jsonify, render_template, make_response, abort
import firebase_admin
import secrets
import string
import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify
from database import  updatePassword, getUid, updateInfomation, updateHotelDetails, getUserEmail, getUserPhone, isBooked



def hotel_modification_func(app):
    @app.route('/HotelAccountMod', methods=['POST'])
    def hotel_modification():
        

        # Get current user's uid
        uid = getUid()
        print("UID in HOTEL MOD: " + uid)
        #get uid in db
        firebase_admin.get_app()
       

        # Get JSON data from frontent 
        data = request.get_json() 
        print(data)


        # Check if email or phone is in availble
        try: # Check if entered email is already in use
            if getUserEmail() != data['email']:
                if 'email' in data and data['email']:
                    usr = auth.get_user_by_email(data['email'])
                    abort(make_response(jsonify(message="Email already in use"), 409))
        except auth.UserNotFoundError:
            pass
        try:
            # Check if entered phone number is already in use
            if getUserPhone() != "+" + data['phoneNumber']:
                if 'phoneNumber' in data and data['phoneNumber']:
                    usr = auth.get_user_by_phone_number("+" + data['phoneNumber']) 
                    abort(make_response(jsonify(message="Phone number already in use"), 409))
        except auth.UserNotFoundError:   
            pass

        
        # Update password
        if 'password' in data and data['password']:
            # Checks if phone number is valid
            if is_valid_password(data['password']):
                updatePassword(uid, data['password'])
                print('Sucessfully updated password: {0}'.format(uid))
            else:
                abort(make_response(jsonify(message="Password should be at least 6 characters"), 400))
            
        # Update info only if no users have booked it
        if(isBooked() == False):
            # Update hotel user information
            if is_valid_phone_number(data['phoneNumber'].strip()):
                updateInfomation(uid, data['email'].strip(), "+" + data['phoneNumber'], data['firstName'].strip(), data['lastName'].strip())
            else:
                abort(make_response(jsonify(message="Please enter valid phone number"), 400))
            # Check if street name is not only space
            if data['streetName'] != '':
                updateHotelDetails(uid, data['hotelName'].strip(), data['streetName'].strip(), data['city'].strip(), data['zipCode'], data['state'].strip(), data['country'].strip())
            else: 
                abort(make_response(jsonify(message="Please enter valid street name"), 400))
        else:
            abort(make_response(jsonify(message="Cannot update hotel information because there are bookings at the hotel."), 409))
        return jsonify({'message': 'Hotel modification was successful'})
        


    @app.route('/addRoomListing', methods=['POST'])
    def hotel_add_listing():
        try:
            roomData = request.get_json()
            # Generate rid and get amenities
            autoId = generate_random_id(20)
            amenities = []
            for dict in roomData['amenities']:
                key = list(dict.keys())[0]
                if dict[key] == True:
                    amenities.append(key)
            uid = getUid()
            hotel_ref = db.collection('user').document(uid)
            hotelDoc = hotel_ref.get().to_dict()
        except Exception as e:
            abort(make_response(jsonify(message=f"Error: {str(e)}"), 400))

        # Ensure user is hotel owner
        if hotelDoc['accountType'] != 'hotel':
            abort(make_response(jsonify(message=f"Error: User is not a hotel owner!"), 400))
         # Ensure listing is between 2023-2024
        if get_year_from_date(roomData['fromDate']) < 2023 or get_year_from_date(roomData['fromDate']) > 2024:
            abort(make_response(jsonify(message=f"Error: Listing should be created between 2023-2024"), 400))
        if get_year_from_date(roomData['toDate']) < 2023 or get_year_from_date(roomData['toDate']) > 2024:
            abort(make_response(jsonify(message=f"Error: Listing should be created between 2023-2024"), 400))
        
        # Add listing to room collection
        try:
            db.collection('room').document(autoId).set({
                    "hotelName": hotelDoc['hotelName'],
                    "street_name": hotelDoc['street'],
                    "zipCode": hotelDoc['zipcode'],
                    "city": hotelDoc['city'],
                    "state": hotelDoc['state'],
                    "country": hotelDoc['country'],
                    "price": roomData['price'],
                    "numberOfBeds": roomData['beds'],
                    "bedType": roomData['bedType'],
                    "numberGuests": roomData['guests'],
                    "numberOfBathrooms": roomData['bathrooms'],
                    "Amenities": amenities,
                    "startDate": format_date(roomData['fromDate']),
                    "endDate": format_date(roomData['toDate']),
                    "imageUrl": roomData['image']
            })
            # If first time making listing for a hotel owner
            print(hotelDoc['listedRooms'][0])
            if hotelDoc['listedRooms'][0] == 0:
                hotel_ref.update({"listedRooms": [autoId]})
            else: # Already have made a listing for this hotel owner
                hotel_ref.update({"listedRooms": firestore.ArrayUnion([autoId])})
            print(autoId)
            return jsonify(message="listing created")
        except Exception as e:
            abort(make_response(jsonify(message=f"Error: {str(e)}"), 400))
        
        # delete hotel account. Require password authentication
    @app.route('/delete_hotel_user', methods=['GET', 'POST'])
    def delete_hotel_user():
        uid = getUid()

        # after authentication, should delete user and automatically delete user data too

        try:
            # Get JSON data from frontend
            data = request.get_json()
            auth.delete_user(uid)
            user_ref = db.collection("users").document(uid)

            # delete them from the db in addition to deleting from auth
            if user_ref.get().exists:
                user_ref.delete()

            return jsonify({'message': f'Guest {uid} has been deleted'})

        except auth.UserNotFoundError:
            abort(make_response(jsonify(message="User doesn't exist"), 404))

        except auth.AuthError as e:
            abort(make_response(jsonify(message=f"Error deleting user: {str(e)}"), 500))

def generate_random_id(length):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def get_year_from_date(date_str):
    parts = date_str.split('/')
    year = int(parts[2])
    return year

def format_date(input_date):
    # Split the date into components
    month, day, year = input_date.split('/')

    # Define a list of month names
    month_names = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    # Get the month name based on the month number
    month_name = month_names[int(month) - 1]

    # Format the date
    formatted_date = f'{month_name} {int(day)}, {year}'

    return formatted_date

# Function to verify phone
def is_valid_phone_number(phone_number):
    # Check if the string is exactly 12 characters long and starts with '+'
    if len(phone_number) == 11:
        return True
    else:
        return False

def is_valid_password(password):
    return len(password) >= 6



