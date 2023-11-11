import firebase_admin
import database
import pyrebase
import requests
import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, make_response, abort
from database import updateHotelDetails, updatePassword, getUid, updateInfomation, getUserEmail, db, getUserPhone, db, roomBooked


def guest_modification_func(app):
    @app.route('/user', methods=['GET', 'PUT', 'DELETE'])
    def guest_modification():

        # Get user's uid from args
        method = request.method
        uid = getUid()
        print("UID: " + uid)

        if method == 'GET':
            return jsonify(db.collection('user').document(uid).get().to_dict())

        elif method == 'PUT':
            # get uid in db
            firebase_admin.get_app()

            # Get JSON data from frontent
            data = request.get_json()

            # Check if email or phone is in availble
            try:  # Check if entered email is already in use
                if auth.get_user(uid).email != data['email'].lower():
                    if 'email' in data and data['email']:
                        usr = auth.get_user_by_email(data['email'])
                        abort(make_response(
                            jsonify(message="Email already in use"), 409))
            except auth.UserNotFoundError:
                pass
            try:
                # Check if entered phone number is already in use
                if auth.get_user(uid).phone_number != data['phoneNumber']:
                    if 'phoneNumber' in data and data['phoneNumber']:
                        usr = auth.get_user_by_phone_number(
                            data['phoneNumber'])
                        abort(make_response(
                            jsonify(message="Phone number already in use"), 418))
            except auth.UserNotFoundError:
                pass

            # Update password
            if 'password' in data and data['password']:
                # Checks if phone number is valid
                if is_valid_password(data['password']):
                    updatePassword(uid, data['password'])
                    print('Sucessfully updated password: {0}'.format(uid))
                else:
                    abort(make_response(
                        jsonify(message="Password should be at least 6 characters"), 400))

            if is_valid_phone_number(data['phoneNumber'].strip()):
                updateInfomation(uid, data['email'].strip(), data['phoneNumber'], data['firstName'].strip(),
                                 data['lastName'].strip())
                if db.collection('user').document(uid).get().to_dict()['accountType'] == 'hotel':
                    updateHotelDetails(uid, data['hotelName'].strip(), data['street'].strip(
                    ), data['city'].strip(), data['zipcode'], data['state'].strip(), data['country'].strip())
            else:
                abort(make_response(
                    jsonify(message="Please enter valid phone number"), 400))

            user_data = db.collection('user').document(uid).get().to_dict()
            return jsonify(user_data)

        elif method == 'DELETE':
            # after authentication, should delete user and automatically delete user data too
            try:
                #Both guest and hotel deletion delete relevant pastBookings
                pastBooking_collection=db.collection('pastBooking')
                user_ref = db.collection('user').document(uid)
                doc = user_ref.get()
                user_data = doc.to_dict()

                account_type = user_data['accountType']
                if account_type == 'guest':
                    booked_rooms = doc.to_dict()['bookedRooms']
                    #for guest, delete past booking by gid (which is just the uid)
                    dPastBookingG=pastBooking_collection.where('gid', '==', uid).stream()
                    
                    if (len(booked_rooms) > 0):
                        abort(make_response(
                            jsonify(message="Cannot delete; User has a booked room"), 400))
                    else:
                        auth.delete_user(uid)
                        for d in dPastBookingG:
                            print((str)(d.to_dict()))
                            d.reference.delete()
                        
                elif account_type == 'hotel':
                    if 'listedRooms' in user_data:
                        listed_rooms = doc.to_dict()['listedRooms']
                        
                        #for hotel, delete past booking by hid (hotelName)
                        hotel_name = user_data['hotelName']
                        if hotel_name == None:
                            abort(make_response(jsonify(message="This hotel user has no hotel"), 400))
                        dPastBookingG=pastBooking_collection.where('hid','==', hotel_name).stream()
                        
                        # Check if any room associated with the hotel has bookings
                        
                        room_ids = user_data.get('listedRooms', [])  

                        #for each room, search guest user collection for a matching booked room by rid. (Guests use the bookedRooms array, so query by those) 
                        users_collection=db.collection('user')
                        for rid in room_ids:
                            print("RID:",rid)
                            query = users_collection.where('bookedRooms', 'array_contains', rid)
                            users=query.stream()
                            #get the rooms of the hotel to delete (rids are all from hotel's listedRooms)
                            rooms_collection=db.collection('room')
                            dRoom=rooms_collection.document((str)(rid))
                            
                            #should get the users that booked this room if any
                            matching_users = [user.to_dict() for user in users]
                            print(matching_users)
                            
                            if len(matching_users)!=0:
                                abort(make_response(jsonify(message="Cannot delete; Hotel user has rooms with bookings"), 400))
                            else:
                                #delete the hotel user from auth, their rooms from room collection, and 
                                #all pastbookings under that hotel name
                                auth.delete_user(uid)
                                dRoom.delete()
                                for d in dPastBookingG:
                                    d.reference.delete()
                                break

                # delete them from the db in addition to deleting from auth
                if user_ref.get().exists:
                    user_ref.delete()

                return jsonify({'message': f'Guest {uid} has been deleted'})

            except auth.UserNotFoundError:
                abort(make_response(jsonify(message="User doesn't exist"), 404))

    @app.route('/reward', methods=['PUT'])
    def reward_points_modification():
        uid = getUid()
        data = request.get_json()
        user_ref = db.collection('user').document(uid)
        user_ref.update({'rewardPoints': data['rewardPoints']})
        user_data = user_ref.get().to_dict()
        return jsonify(user_data)

# Function to verify phone
def is_valid_phone_number(phone_number):
    # Check if the string is exactly 12 characters long and starts with '+'
    if len(phone_number) == 12:
        return True
    else:
        return False


def is_valid_password(password):
    return len(password) >= 6
