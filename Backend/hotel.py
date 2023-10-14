from database import auth, pyrebase_auth, db, roomBooked, update_room
from flask import Flask, request, jsonify, render_template, make_response, abort
import firebase_admin
import secrets
import string
from datetime import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify
from database import  updatePassword, getUid, updateInfomation, updateHotelDetails, getUserEmail, getUserPhone, isBooked
from google.cloud.firestore_v1.base_query import FieldFilter


def hotel_modification_func(app):
    @app.route('/hotel', methods=['PUT'])
    def hotel_modification():
        
        # Get current user's uid
        uid = request.args['uid']
        print("UID: " + uid)
        #get uid in db
        firebase_admin.get_app()
       
        # Get JSON data from frontent 
        data = request.get_json() 
        print(data)
        
        try:
            # Check if entered phone number is already in use
            if 'phone' in data and data['phone']:
                usr = auth.get_user_by_phone_number(data['phone'])
                abort(make_response(jsonify(message="Phone number already in use"), 409))
        except auth.UserNotFoundError:
            pass

        
        # Update password
        if 'newPassword' in data and data['password']:
            # Checks if phone number is valid
            if is_valid_password(data['password']):
                updatePassword(uid, data['password'])
                print('Sucessfully updated password: {0}'.format(uid))
            else:
                abort(make_response(jsonify(message="Password should be at least 6 characters"), 400))

        if is_valid_phone_number(data['phoneNumber'].strip()):
            updateInfomation(uid, data['phoneNumber'], data['firstName'].strip(),
                             data['lastName'].strip())
        else:
            abort(make_response(jsonify(message="Please enter valid phone number"), 400))
        # Check if street name is not only space
        if data['street'] != '':
            updateHotelDetails(uid, data['hotelName'].strip(), data['street'].strip(), data['city'].strip(),
                               data['zipcode'], data['state'].strip(), data['country'].strip())
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
            if hotelDoc['accountType'] != 'hotel':
                return jsonify(message="User is not a Hotel Owner")
            # Ensure listing is between 2023-2024
            if get_year_from_date(roomData['fromDate']) < 2023 or get_year_from_date(roomData['fromDate']) > 2024:
                return jsonify(message="Listing should be created between 2023-2024")
            if get_year_from_date(roomData['toDate']) < 2023 or get_year_from_date(roomData['toDate']) > 2024:
                return jsonify(message="Listing should be created between 2023-2024")
            # Add listing to room collection
            
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
    # Modify hotel listing
    @app.rout('/ListingMod', methods = ['POST'])
    def listing_modification():
        uid = getUid()
        print("HELO")
        #get uid in db
        firebase_admin.get_app()
       
       
        # Get JSON data from frontent 
        data = request.get_json()
        print(data['fromDate'])
        print(data['toDate'])
        amenities = []
        for dict in data['amenities']:
            key = list(dict.keys())[0]
            if dict[key] == True:
                amenities.append(key)
        print(amenities)     
        if roomBooked() == False:
            #cYXBww5bSw4nYbdv2RzM
            if is_start_date_before_or_on_end_date(data['fromDate'], data['toDate']):
                update_room(request.args['rid'], data['price'], format_date(data['fromDate']), format_date(data['toDate']), data['beds'], data['guests'], data['bathrooms'], data['bedType'], data['image'], amenities)
                return jsonify({'message': 'Listing modification was successful'})
            else:
                abort(make_response(jsonify(message="Start date cannot be after end date"), 400))
        else:
            abort(make_response(jsonify(message="Room is booked. Changes are not allowed."), 403))    
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


    @app.route('/listing', methods=['POST', 'GET'])
    def hotel_add_listing():
        # Get all Listings
        if(request.method == 'GET'):
            listings = []
            docs = []

            if(request.args.get('uid') is None):
                docs = (db.collection("room").stream())
            else: 
                uid = request.args['uid']
                hotelOwner = db.collection('user').document(uid).get().to_dict()
                hotelName = hotelOwner['hotelName']
                docs = (db.collection("room").where(filter=FieldFilter("hotelName", "==", hotelName)).stream())
            for doc in docs:
                listing = doc.to_dict()
                listing['rid'] = doc.id
                listings.append(listing)
            return jsonify(listings)
        
        # Add a listing
        elif request.method =='POST' :
                
            try:
                roomData = request.get_json()
                # Generate rid and get amenities
                autoId = generate_random_id(20)
                amenities = []
                for dict in roomData['amenities']:
                    key = list(dict.keys())[0]
                    if dict[key] == True:
                        amenities.append(key)
                uid = request.args['uid']
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

                listing = db.collection("room").document(autoId).get().to_dict()
                listing['rid'] = autoId
                return jsonify(listing)
            except Exception as e:
                abort(make_response(jsonify(message=f"Error: {str(e)}"), 400))
    
    @app.route('/listing/<rid>', methods=['GET', 'PUT', 'DELETE'])
    def listing(rid):
        if(db.collection('room').document(rid).get().exists == False):
            abort(make_response(jsonify(message="Not Exists"), 404))

        # Get a listing info
        if request.method == 'GET':    
            listing = db.collection('room').document(rid).get().to_dict()
            listing['rid'] = rid
            return listing
        
        # Modify a Listing
        if request.method == 'PUT':
            uid = request.args['uid']

            #get uid in db
            firebase_admin.get_app()
        
            # Get JSON data from frontent 
            data = request.get_json()
            
            amenities = []
            for dict in data['amenities']:
                key = list(dict.keys())[0]
                if dict[key] == True:
                    amenities.append(key)
            print(amenities)     
            if roomBooked(rid) == False:
                #cYXBww5bSw4nYbdv2RzM
                if is_start_date_before_or_on_end_date(data['fromDate'], data['toDate']):
                    update_room(uid, rid, data['price'], format_date(data['fromDate']), format_date(data['toDate']), data['beds'], data['guests'], data['bathrooms'], data['bedType'], data['image'], amenities)
                    return jsonify({'message': 'Listing modification was successful'})
                else:
                    abort(make_response(jsonify(message="Start date cannot be after end date"), 400))
            else:
                abort(make_response(jsonify(message="Room is booked. Changes are not allowed."), 403))
        
        # Delete a listing
        if request.method == 'DELETE':
            db.collection('room').document(rid).delete()
            return "Success"


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





## listing mod

def is_start_date_before_or_on_end_date(start_date_str, end_date_str):
    # Convert the date strings to datetime objects
    start_date = datetime.strptime(start_date_str, "%m/%d/%Y")
    end_date = datetime.strptime(end_date_str, "%m/%d/%Y")

    # Compare the start and end dates
    return start_date <= end_date


    # Compare the start and end dates
    return start_date <= end_date