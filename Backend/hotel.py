from database import auth, pyrebase_auth, db
from flask import Flask, request, jsonify, render_template, make_response, abort
import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for
import secrets
import string
from database import  updatePassword, getUid, updateInfomation, updateHotelDetails, getUserEmail, getUserPhone
import datetime



def hotel_modification_func(app):
    @app.route('/AccountMod', methods=['POST', 'GET'])
    def hotel_modification():
        

        # Get current user's uid
        uid = getUid()
        print("UID: " + uid)
        #get uid in db
        firebase_admin.get_app()
       

        # Get JSON data from frontent 
        data = request.get_json() 


        # Check if email or phone is in availble
        try: # Check if entered email is already in use
            if getUserEmail != data['email']:
                if 'email' in data and data['email']:
                    usr = auth.get_user_by_email(data['email'])
                    abort(make_response(jsonify(message="Email already in use"), 409))
        except auth.UserNotFoundError:
            pass
        try:
            # Check if entered phone number is already in use
            if getUserPhone != "+" + data['phone']:
                if 'phone' in data and data['phone']:
                    usr = auth.get_user_by_phone_number("+" + data['phone']) 
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
            
        
        
        # Update hotel user information
        if is_valid_phone_number(data['phoneNumber'].strip()):
            updateInfomation(uid, data['email'].strip(), "+" + data['phoneNumber'], data['firstName'].strip(), data['lastName'].strip())
        else:
            abort(make_response(jsonify(message="Please enter valid phone number"), 400))
        # Check if street name is not only space
        if data['street'] != '':
            updateHotelDetails(uid, data['hotelName'].strip(), data['street'].strip(), data['city'].strip(), data['zip'], data['state'].strip, data['country'].strip())
        else: 
            abort(make_response(jsonify(message="Please enter valid street name"), 400))
        


    @app.route('/addRoomListing', methods=['POST'])
    def hotel_add_listing():
        roomData = request.get_json()
        # Generate rid and get amenities
        autoId = generate_random_id(20)
        amenities = []
        for dict in roomData['amenities']:
            key = list(dict.keys())[0]
            if dict[key] == True:
                amenities.append(key)
        try:
            uid = getUid()
            hotel_ref = db.collection('user').document(uid)
            hotelDoc = hotel_ref.get().to_dict()
            # Ensure authenticated user is a hotel owner
            if hotelDoc['accountType'] != 'hotel':
                return jsonify({
                    "errorMsg": "User is not a hotel owner!"
                })
            # Ensure listing is between 2023-2024
            current_year = datetime.datetime.now().year
            if current_year < 2023 or current_year > 2024:
                return jsonify({
                    "errorMsg": "Listing must be available between 2023-2024"
                })
            # Add listing to room collection
            
            print(f"The current year is: {current_year}")
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
            return jsonify({"msg": "Listing Successfuly Created"})
        except Exception as e:
            return abort(make_response(jsonify(
                message="Listing must be available between 2023-2024"
            ), 404))

def generate_random_id(length):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

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
    if len(phone_number) == 12 and phone_number[0] == '+':
        return True
    else:
        return False

def is_valid_password(password):
    return len(password) >= 6


