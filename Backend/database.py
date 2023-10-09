import firebase_admin
from firebase_admin import credentials, firestore, auth, exceptions
import pyrebase
import jwt
from flask import Flask, request, jsonify
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
def addUser(email, phone, password, firstName, lastName, type, hotel=None): # 'hotel' is an OPTIONAL parameter, only applies for users registering as a hotel
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
    
    # Adding user to custom "user" database
    if hotel == None:
        doc_ref = db.collection("user").document(user.uid).set({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'accountType': type
        })
    else:
        doc_ref = db.collection("user").document(user.uid).set({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'hotelName': hotel,
            'accountType': type
        })
    print('Sucessfully created new user: {0}'.format(user.uid))

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


def guestLogin(email, password):
    user = pyrebase_auth.sign_in_with_email_and_password(email, password)

# Function to return uid of current user
def getUid():
    # Get JSON of user's information
    user_info = pyrebase_auth.current_user
    user_info = jsonify(user_info)
    user_data = user_info.get_json()
    # Get id token from JSON
    id_token = user_data['idToken']
    print("idToken: " + id_token)
    
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


def updatePhone(uid, phone):
    user = auth.update_user(
        uid,
        phone_number = phone)
    # Update the user's phone number in Firestore
    user_ref = db.collection('user').document(uid)
    user_ref.update({'phone': phone})
    
def updateEmail(uid, email):
    user = auth.update_user(
        uid,
        email = email)
    
    # Update the user's email in Firestore
    user_ref = db.collection('user').document(uid)
    user_ref.update({'email': email})
    
def updateName(uid, name):
    user = auth.update_user(
        uid,
        display_name = name)
    
def updatePassword(uid, newPassword):
    user = auth.update_user(
        uid,
        password='newPassword')
    
def updateFirstName(uid, first_name):
    # Update the user's first name in Firestore
    user_ref = db.collection('user').document(uid)
    user_ref.update({'firstName': first_name})

def updateLastName(uid, last_name):
    # Update the user's last name in Firestore
    user_ref = db.collection('user').document(uid)
    user_ref.update({'lastName': last_name})

def updateHotelName(uid, hotel_name):
    user_ref = db.collection('user').document(uid)
    user_ref.update({'hotelName': hotel_name})
    
# Function to modify user's information
#def changeGuestInfo(email, phone, password, first_name, ):