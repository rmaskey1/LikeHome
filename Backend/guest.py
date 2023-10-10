import firebase_admin
import database
import pyrebase
import requests
import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for
from database import  updatePassword, getUid, updateInfomation


def guest_modification_func(app):
    @app.route('/AccountMod', methods=['POST', 'GET'])
    def guest_modification():
        
        # Get current user's uid
        uid = getUid()
        print("UID: " + uid)
        #get uid in db
        firebase_admin.get_app()
       

        # Get JSON data from frontent 
        data = request.get_json() 


        # Check if email or phone is in availble
        try: # Check if entered email is already in use
            if 'email' in data and data['email']:
                usr = auth.get_user_by_email(data['email'])
                return {"message" : "Email number is already in use", "status" : 409}
        except auth.UserNotFoundError:
            pass
        try:
            # Check if entered phone number is already in use
            if 'phone' in data and data['phone']:
                usr = auth.get_user_by_phone_number("+" + data['phone']) 
                return {"message" : "Phone number is already in use", "status" : 409}
        except auth.UserNotFoundError:   
            pass

        # Update password
        if 'newPassword' in data and data['password']:
            # Checks if phone number is valid
            if is_valid_password(data['password']):
                updatePassword(uid, data['password'])
                print('Sucessfully updated password: {0}'.format(uid))
            else:
                return {"message" : "Please enter a valid password", "status" : 409}
            
        
        if is_valid_phone_number(data['phoneNumber'].strip()):
            updateInfomation(uid, data['email'].strip(), "+" + data['phoneNumber'], data['firstName'].strip(), data['lastName'].strip())
        else:
            return {"message" : "Please enter a valid phone number", "status" : 409} 
        

        



# Function to verify phone
def is_valid_phone_number(phone_number):
    # Check if the string is exactly 12 characters long and starts with '+'
    if len(phone_number) == 11:
        return True
    else:
        return False

def is_valid_password(password):
    return len(password) >= 6



