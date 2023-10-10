import firebase_admin
import database
import pyrebase
import requests
import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for
from database import updatePhone, updateEmail, updateName, updatePassword, getUid, updateLastName, updateFirstName


def guest_modification_func(app):
    @app.route('/guest_modification', methods=['POST', 'GET'])
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
                return "Email already in use."
        except auth.UserNotFoundError:
            pass
        try:
            # Check if entered phone number is already in use
            if 'phone' in data and data['phone']:
                usr = auth.get_user_by_phone_number(data['phone']) 
                return "Phone number already in use."
        except auth.UserNotFoundError:   
            pass

        # Update email 
        if 'email' in data and data['email']:
            updateEmail(uid, email = data['email'])
            print('Sucessfully updated email: {0}'.format(uid))

        # Update phone number
        if 'phoneNumber' in data and data['phoneNumber']:
            # Checks if phone number is valid
            print("In first if for phone")
            if is_valid_phone_number(data['phoneNumber']):
                updatePhone(uid, data['phoneNumber'])
                print('Sucessfully updated phone number: {0}'.format(uid))
            else:
                return "Please enter a valid phone number."


        # Split name in DB 
        full_name = auth.get_user(uid).display_name
        first_name, last_name = split_full_name(full_name)
        # If first name field is not empty, update display name
        if 'firstName' in data and data['firstName']:
            updateName(uid, combine_name(data['firstName'], last_name))
            updateFirstName(uid, data['firstName'])
            print('Sucessfully updated first name: {0}'.format(uid))


        # Split name in DB 
        full_name = auth.get_user(uid).display_name
        first_name, last_name = split_full_name(full_name)
        # If last name field is not empty, update display name
        if 'lastName' in data and data['lastName']:
            updateName(uid, combine_name(first_name, data['lastName']))
            updateLastName(uid, data['lastName'])
            print('Sucessfully updated last name: {0}'.format(uid))
    
        print("Above Pass")
        # Update password
        if 'newPassword' in data and data['password']:
            # Checks if phone number is valid
            if is_valid_password(data['password']):
                updatePassword(uid, data['password'])
                print('Sucessfully updated password: {0}'.format(uid))
            else:
                return "Please enter a valid phone number"

        



# Function to verify phone
def is_valid_phone_number(phone_number):
    # Check if the string is exactly 12 characters long and starts with '+'
    if len(phone_number) == 12 and phone_number[0] == '+':
        return True
    else:
        return False

def is_valid_password(password):
    return len(password) >= 6

# Function to split full name
def split_full_name(full_name):
    name_parts = full_name.split()

    first_name = name_parts[0]
    last_name = ' '.join(name_parts[1:])
    
    return first_name, last_name

# Function to combine first and last name
def combine_name(first_name, last_name):
    full_name = first_name + " " + last_name
    return full_name


