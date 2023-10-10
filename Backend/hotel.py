from database import auth, pyrebase_auth, db
from flask import Flask, request, jsonify, render_template
import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for
from database import  updatePhone, updateEmail, updateName, updatePassword, getUid, updateLastName, updateFirstName, updateHotelName, updateCountry, updateCity, updateState, updateStreet, updateZip, updateInfomation, updateHotelDetails
    
# Function to return uid of current user
def getUid():
    # Get JSON of user's information
    user_info = pyrebase_auth.current_user
    user_info = jsonify(user_info)
    user_data = user_info.get_json()
    # Get email from JSON
    id_token = user_data['idToken']
    
    try:
        # Verify the ID token to get its payload
        decoded_token = auth.verify_id_token(id_token)
        
        # Extract the UID from the payload
        uid = decoded_token.get('uid')
        
        return uid
    except auth.ExpiredIdTokenError:
        # Handle expired token error
        return None
    except auth.InvalidIdTokenError:
        # Handle other invalid token errors
        return None

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
                updatePhone(uid, "+" + data['phoneNumber'])
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
    
        # Update password
        if 'newPassword' in data and data['password']:
            # Checks if phone number is valid
            if is_valid_password(data['password']):
                updatePassword(uid, data['password'])
                print('Sucessfully updated password: {0}'.format(uid))
            else:
                return "Please enter a valid phone number"
            
        # Update hotel name
        if 'hotelName' in data and data['hotelName']:
            updateHotelName(uid, data['hotelName'])
            print('Sucessfully updated hotel name: {0}'.format(uid))


        # Update street
        if 'street' in data and data['street'] != '':
            updateStreet(uid, data['street'])
            print('Sucessfully updated street: {0}'.format(uid))

        # Update city
        if 'city' in data and data['city']:
            updateCity(uid, data['city'])
            print('Sucessfully updated city: {0}'.format(uid))

        # Update zip
        if 'zip' in data and data['zip']:
            updateZip(uid, data['zip'])
            print('Sucessfully updated zip: {0}'.format(uid))

        # Update state
        if 'state' in data and data['state']:
            updateState(uid, data['state'])
            print('Sucessfully updated state: {0}'.format(uid))
        
        # Update country
        if 'country' in data and data['country']:
            updateCountry(uid, data['country'])
            print('Sucessfully updated country: {0}'.format(uid))

        #TODO: Delete if info is not automatically filled
        #!if is_valid_phone_number(data['phoneNumber'].strip()):
        #!    updateInfomation(uid, data['email'].strip(), "+" + data['phoneNumber'], data['firstName'].strip(), data['lastName'].strip())

        #TODO: Delete if info is not automatically filled
        # Check if street is not only space
        #!if data['street'] != '':
        #!    updateHotelDetails(uid, data['hotelName'].strip(), data['street'].strip(), data['city'].strip(), data['zip'], data['state'].strip, data['country'].strip())
        #!else: 
        #!    return "Invalid street name"
        

        



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


