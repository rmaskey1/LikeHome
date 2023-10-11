import firebase_admin
from firebase_admin import credentials, firestore, auth, exceptions
import pyrebase
import jwt
import datetime
from flask import Flask, request, jsonify, make_response, abort
from datetime import timedelta

# -----------IMPORTANT-------------
# 1. On your terminal execute this command "pip install firebase-admin"
# 2. Also install Flask: "pip install flask"
# 3. Download serviceAccountKey.json under resources in our discord channel
# 4. Drag that file and add it into backend folder if you have not done so
# 5. Make sure you are in cmpe165-likehome directory and not Backend directory
# 6. Run the python file
cred = credentials.Certificate("Backend/serviceAccountKey.json")

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app(cred)
db = firestore.client()

config = {
  "apiKey": "AIzaSyBSFok_KWaBdRyXkdrqektCu8E0rYyhV5Y",
  "authDomain": "innsight-87ed1.firebaseapp.com",
  "projectId": "innsight-87ed1",
  "databaseURL": "https://databasename.firebaseio.com/",
  "storageBucket": "innsight-87ed1.appspot.com"
}
firebase = pyrebase.initialize_app(config)
pyrebase_auth = firebase.auth()

# Function that returns auth
def get_auth():
    return pyrebase_auth


# Function to add user to database
def addUser(email, phone, password, firstName, lastName, type): # 'hotel' is an OPTIONAL parameter, only applies for users registering as a hotel
    dispName = firstName + lastName
    # Adding user to authentication database
    user = auth.create_user(
        email=email,
        phone_number=phone,
        password=password,
        display_name=dispName
    )
    # Setting access rights for added user
    if type == "guest":
        auth.set_custom_user_claims(user.uid, {
            'guest': True,
            'hotel': False
        })
    elif type == "hotel":
        auth.set_custom_user_claims(user.uid, {
            'guest': False,
            'hotel': True
        })
    elif type == "admin":
        auth.set_custom_user_claims(user.uid, {
            'guest': True,
            'hotel': True
        })
    # Adding user to custom "user" database
    doc_ref = db.collection("user").document(user.uid).set({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone,
        'password': password,
        'accountType': type
    })

    print('Sucessfully created new user: {0}'.format(user.uid))
    return user

# Adding hotel information to "hotel" type user document
def addHotelInfo(userId, hotelName, street, city, zip, state, country):
    doc_ref = db.collection("user").document(userId)
    doc_ref.update({
        "hotelName": hotelName,
        "street": street,
        "city": city,
        "zip": zip,
        "state": state,
        "country": country
    })

def addBooking(uid, rid, start_date, end_date):
    doc_ref = db.collection("booking").document(rid).set({
            'uid': uid,
            'startDate': start_date,
            'endDate': end_date,
        })

# Main method for testing
def main():
    # addUser("gmail@email.com", "+15555555557", "password", "Mike", "Mike", "guest")
    # user1 = auth.get_user_by_email("email@email.com")
    # if user1.custom_claims.get('guest') == True:
    #     print("works")
    
    addUser("qmail@email.com", "+15678555557", "password", "Mike", "Mike", "hotel", "hotel inn")
    user2 = auth.get_user_by_email("email@email.com")
    if user2.custom_claims.get('guest') == True:
        print("works")

    addBooking('efjnejrgndfs', 'egfnejsgrnsjfn', datetime.datetime(2023, 10, 6, 20, 0, 0) , datetime.datetime(2023, 10, 7, 10, 0, 0))


# Function to return uid of current user
def getUid():
    # Get JSON of user's information
    user_info = pyrebase_auth.current_user
    user_info = jsonify(user_info)
    user_data = user_info.get_json()
    # Get id token from JSON
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

def getUserInfo():
    user_info = pyrebase_auth.current_user
    user_info = jsonify(user_info)
    user_data = user_info.get_json()
    uid = getUid()
    user_data['uid'] = uid
    return user_data


# Update password on Authenication
def updatePassword(uid, newPassword):
    user = auth.update_user(
        uid,
        password='newPassword')

# Update basic user information
def updateInfomation(uid, email, phone, firstName, lastName):
    # Firestore Database
    doc_ref = db.collection("user").document(uid)
    doc_ref.update({
       'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone
    })
    # Authenication 
    user = auth.update_user(
        uid,
        email = email,
        phone_number = phone,
        display_name = firstName + " " + lastName)
    
# Update hotel name and hotel address
def updateHotelDetails(uid, hotelName, street, city, zip, state, country):
    doc_ref = db.collection("user").document(uid)
    doc_ref.update({
        "hotelName": hotelName,
        "street": street,
        "city": city,
        "zip": zip,
        "state": state,
        "country": country
    })

def getAccountType():
    user_ref = db.collection("user").document(getUid())
    userDoc = user_ref.get().to_dict()
    accountType = userDoc['accountType']
    return accountType
# Function to modify user's information
#def changeGuestInfo(email, phone, password, first_name, ):