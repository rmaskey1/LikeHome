import firebase_admin
import database
import pyrebase
import requests
import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, make_response, abort
from database import updateHotelDetails, updatePassword, getUid, updateInfomation, getUserEmail, db, getUserPhone, checkIfRoomExists, pyrebase_auth, checkUserIsLoggedIn
from database import getGuestBookedRooms, getAccountType
from google.cloud import firestore

def guest_modification_func(app):
    @app.route('/user', methods=['GET', 'PUT', 'DELETE'])
    def guest_modification():

        # Get user's uid from args
        method = request.method
        uid = request.args['uid']
        print("UID: " + uid)

        if method == 'GET':
            return jsonify(db.collection('user').document(uid).get().to_dict())

        elif method == 'PUT': 
            # get uid in db
            firebase_admin.get_app()

            # Get JSON data from frontent 
            data = request.get_json()

            # Check if email or phone is in availble
            try: # Check if entered email is already in use
                if auth.get_user(uid).email != data['email'].lower():
                    if 'email' in data and data['email']:
                        usr = auth.get_user_by_email(data['email'])
                        abort(make_response(jsonify(message="Email already in use"), 409))
            except auth.UserNotFoundError:
                pass
            try:
                # Check if entered phone number is already in use
                if auth.get_user(uid).phone_number !=  data['phoneNumber']:
                    if 'phoneNumber' in data and data['phoneNumber']:
                        usr = auth.get_user_by_phone_number( data['phoneNumber']) 
                        abort(make_response(jsonify(message="Phone number already in use"), 418))
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

            if is_valid_phone_number( data['phoneNumber'].strip()):
                updateInfomation(uid, data['email'].strip(), data['phoneNumber'], data['firstName'].strip(),
                                data['lastName'].strip())
                if db.collection('user').document(uid).get().to_dict()['accountType'] == 'hotel':
                    updateHotelDetails(uid, data['hotelName'].strip(), data['street'].strip(), data['city'].strip(), data['zipcode'], data['state'].strip(), data['country'].strip())
            else:
                abort(make_response(jsonify(message="Please enter valid phone number"), 400))

            user_data = db.collection('user').document(uid).get().to_dict()
            return jsonify(user_data)
        
        elif method == 'DELETE':
            # after authentication, should delete user and automatically delete user data too
            try:
                user_ref = db.collection('user').document(uid)
                doc = user_ref.get()
                
                if 'bookedRooms' in doc.to_dict():
                    booked_rooms = doc.to_dict()['bookedRooms']
                    if (len(booked_rooms) > 0):
                        abort(make_response(jsonify(message="Cannot delete; User has a booked room"), 400))
                    else:
                        auth.delete_user(uid)
                else:
                    auth.delete_user(uid)
                # delete them from the db in addition to deleting from auth
                if user_ref.get().exists:
                    user_ref.delete()

                return jsonify({'message': f'Guest {uid} has been deleted'})

            except auth.UserNotFoundError:
                abort(make_response(jsonify(message="User doesn't exist"), 404))

            # except auth.AuthError as e:
            #     abort(make_response(jsonify(message=f"Error deleting user: {str(e)}"), 500))

    @app.route('/bookings', methods=['GET', 'PUT', 'DELETE'])
    def bookings():
        # check if user is logged in, uid checking
        if checkUserIsLoggedIn() == False:
            abort(make_response(jsonify(message="User is not logged in"), 404))
        
        # Get guest's mybookings
        if request.method == 'GET':
            # Can return empty array if there are no bookings
            if getAccountType() == 'hotel':
                abort(make_response(jsonify(message="User is not a guest!"), 404))
            
            return jsonify(getGuestBookedRooms(getUid()))

    @app.route('/bookings/<rid>', methods=['PUT', 'DELETE'])
    def modify_bookings(rid):
        # check if user is logged in, uid checking
        if checkUserIsLoggedIn() == False:
            abort(make_response(jsonify(message="User is not logged in"), 404))
        
        # test if rid exists
        if checkIfRoomExists(rid) == False:
            abort(make_response(jsonify(message="Rid and room does not exist"), 400))

        # Modify Booking Here
        if request.method == 'PUT':
            booking_ref = db.collection("booking")
            # Search for the specific booking and update it 
            query_ref = booking_ref.where("rid", "==", rid)
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
            query_ref = booking_ref.where("rid", "==", rid)
            docs = query_ref.stream()
            for doc in docs:
                doc.reference.delete()
            # Delete the booked room in guest's bookedRooms array
            uid = getUid()
            user_ref = db.collection('user').document(uid)
            user_ref.update({"bookedRooms": firestore.ArrayRemove([rid])})

            return jsonify(message= "Deletion Successfull")

# Function to verify phone
def is_valid_phone_number(phone_number):
    # Check if the string is exactly 12 characters long and starts with '+'
    if len(phone_number) == 12:
        return True
    else:
        return False


def is_valid_password(password):
    return len(password) >= 6




