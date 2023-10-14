import firebase_admin
import database
import pyrebase
import requests
import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, make_response, abort
from database import updatePassword, getUid, updateInfomation, getUserEmail, db, getUserPhone, db


def guest_modification_func(app):
    @app.route('/user', methods=['PUT'])
    def guest_modification():
        
        # Get user's uid from args
        uid = request.args['uid']
        print("UID: " + uid)
        # get uid in db
        firebase_admin.get_app()

        # Get JSON data from frontent 
        data = request.get_json() 

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
            if getUserPhone() != "+1" + data['phoneNumber']:
                if 'phoneNumber' in data and data['phoneNumber']:
                    usr = auth.get_user_by_phone_number("+1" + data['phoneNumber']) 
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

        if is_valid_phone_number("+1" + data['phoneNumber'].strip()):
            updateInfomation(uid, data['email'].strip(), "+1" + data['phoneNumber'], data['firstName'].strip(),
                             data['lastName'].strip())
        else:
            abort(make_response(jsonify(message="Please enter valid phone number"), 400))

        user_data = db.collection('user').document(uid).get().to_dict()
        return jsonify(user_data)

    # delete guest account. (Maybe) add password authentication requirement to delete
    @app.route('/delete_guest_user', methods=['POST'])
    def delete_guest_user():
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


# Function to verify phone
def is_valid_phone_number(phone_number):
    # Check if the string is exactly 12 characters long and starts with '+'
    if len(phone_number) >= 11 and len(phone_number) <= 11:
        return True
    else:
        return False


def is_valid_password(password):
    return len(password) >= 6



