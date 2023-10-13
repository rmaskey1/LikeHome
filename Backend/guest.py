import firebase_admin
import database
import pyrebase
import requests
import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, make_response, abort
from database import updatePassword, getUid, updateInfomation, getUserEmail, db


def guest_modification_func(app):
    @app.route('/user', methods=['PUT'])
    def guest_modification():
        
        # Get user's uid from args
        uid = request.args['uid']
        print("UID: " + uid)

        # Get JSON data from frontent 
        data = request.get_json() 

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

        user_data = db.collection('user').document(uid).get().to_dict()
        return jsonify(user_data)

    # delete guest account. (Maybe) add password authentication requirement to delete
    @app.route('/delete_guest_user', methods=['POST'])
    def delete_guest_user():
        
        if request.method == 'POST':
            uid=getUid()
            password = request.form["password"]
            #after authentication, should delete user and automatically delete user data too
            try: 
                auth.update_user(uid,password)
                auth.delete_user(uid)
                return jsonify({'message':'Guest {uid} has been deleted'})
                
            except auth.UserNotFoundError:
                return jsonify({'message':'User doesn\'t exist'})
            except auth.AuthError as e:
                return jsonify({'message':'Error deleting user: {str(e)}'})    
        



# Function to verify phone
def is_valid_phone_number(phone_number):
    # Check if the string is exactly 12 characters long and starts with '+'
    if len(phone_number) == 12:
        return True
    else:
        return False

def is_valid_password(password):
    return len(password) >= 6



