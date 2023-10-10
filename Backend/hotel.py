from database import auth, pyrebase_auth, db
from flask import Flask, request, jsonify, render_template
import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, render_template, redirect, url_for
from database import  updatePhone, updateEmail, updateName, updatePassword, getUid, updateLastName, updateFirstName, updateHotelName
    
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
    @app.route('/hotel_modification', methods=['POST', 'GET'])
    def hotel_modification():
        

        # Get current user's uid
        uid = getUid()
        #get uid in db
        firebase_admin.get_app()
        if request.method == "POST":


            # Define a list of field names you want to extract
            fields_to_extract = ['firstName', 'lastName', 'email','newPassword', 'phone', 'hotelName']

            # Initialize an empty dictionary to store the extracted fields
            extracted_fields = {}

            # Iterate through the field names and extract them if they exist and are not empty
            for field_name in fields_to_extract:
                field_value = request.form.get(field_name)
                if field_value:
                    extracted_fields[field_name] = field_value
                    print(field_name + " : " + field_value)


            # Check if email or phone is in availble
            try: # Check if entered email is already in use
                if 'email' in extracted_fields and extracted_fields['email']:
                    usr = auth.get_user_by_email(extracted_fields['email']) # Returns auth.UserNotFoundError if email does not exist, jumps to first except block
                    print("Email already in use.")
                    return render_template("hotel_modification.html", emailError=True) # Returns signup.html page with error message
            except auth.UserNotFoundError:
                pass
            try:
                # Check if entered phone number is already in use
                if 'phone' in extracted_fields and extracted_fields['phone']:
                    usr = auth.get_user_by_phone_number(extracted_fields['phone']) # Returns auth.UserNotFoundError if email does not exist, jumps to first except block
                    print("Phone number already in use.")
                    return render_template("hotel_modification.html", phoneError=True) # Returns signup.html page with error message
            except auth.UserNotFoundError:   
                pass

            # Update email 
            if 'email' in extracted_fields and extracted_fields['email']:
                updateEmail(uid, email = extracted_fields['email'])
                print('Sucessfully updated email: {0}'.format(uid))

            # Update phone number
            if 'phone' in extracted_fields and extracted_fields['phone']:
                # Checks if phone number is valid
                print("In first if for phone")
                if is_valid_phone_number(extracted_fields['phone']):
                    updatePhone(uid, extracted_fields['phone'])
                    print('Sucessfully updated phone number: {0}'.format(uid))
                else:
                    return render_template("hotel_modification.html", phoneError2=True)

            # Update hotel name
            if 'hotelName' in extracted_fields and extracted_fields['hotelName']:
                updateName(uid, extracted_fields['hotelName'])
                updateHotelName(uid, extracted_fields['hotelName'])
                print('Sucessfully updated hotel name: {0}'.format(uid))

            # Split name in DB 
            full_name = auth.get_user(uid).display_name
            first_name, last_name = split_full_name(full_name)
            # If first name field is not empty, update display name
            if 'firstName' in extracted_fields and extracted_fields['firstName']:
                updateName(uid, combine_name(extracted_fields['firstName'], last_name))
                updateFirstName(uid, extracted_fields['firstName'])
                print('Sucessfully updated first name: {0}'.format(uid))


            # Split name in DB 
            full_name = auth.get_user(uid).display_name
            first_name, last_name = split_full_name(full_name)
            # If last name field is not empty, update display name
            if 'lastName' in extracted_fields and extracted_fields['lastName']:
                updateName(uid, combine_name(first_name, extracted_fields['lastName']))
                updateLastName(uid, extracted_fields['lastName'])
                print('Sucessfully updated last name: {0}'.format(uid))
        
            # Update password
            if 'newPassword' in extracted_fields and extracted_fields['newPassword']:
                # Checks if phone number is valid
                if is_valid_password(extracted_fields['newPassword']):
                    updatePassword(uid, extracted_fields['newPassword'])
                    print('Sucessfully updated password: {0}'.format(uid))
                else:
                    return render_template("hotel_modification.html", passwordError=True)

            return render_template("hotel_modification.html")
        
        else:
            return render_template("hotel_modification.html", error=False) # Returns signup.html page if no POST request is made yet




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


