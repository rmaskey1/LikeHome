import firebase_admin
from firebase_admin import credentials, firestore, auth, exceptions
import pyrebase
import jwt
import datetime
from flask import Flask, request, jsonify, make_response, abort
from datetime import timedelta
from google.cloud.firestore_v1.base_query import FieldFilter
import stripe
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

stripe.api_key = 'sk_test_51O7eg3BeDJOROtaCd2D3qBBa3G32SwNfI0c0Z9FxKbs8gTFKxOZmrKRlgZEehOweHAKQvnGvivNnB25eFIwtYguf00nnU3B80B'


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
    # Setting access rights for added user and creating user documents for "user database"
    if type == "guest":
        auth.set_custom_user_claims(user.uid, {
            'guest': True,
            'hotel': False
        })
        doc_ref = db.collection("user").document(user.uid).set({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'accountType': type,
            'rewardPoints': 0,
            'bookedRooms': []
        })
    elif type == "hotel":
        auth.set_custom_user_claims(user.uid, {
            'guest': False,
            'hotel': True
        })
        doc_ref = db.collection("user").document(user.uid).set({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'accountType': type,
            'rewardPoints': 0,
            "listedRooms": [0]
        })
    elif type == "admin":
        auth.set_custom_user_claims(user.uid, {
            'guest': True,
            'hotel': True
        })
        doc_ref = db.collection("user").document(user.uid).set({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'accountType': type
        })

    print('Sucessfully created new user: {0}'.format(user.uid))
    return user

# Adding hotel information to "hotel" type user document
def addHotelInfo(userId, hotelName, street, city, zipcode, state, country):
    doc_ref = db.collection("user").document(userId)
    doc_ref.update({
        "hotelName": hotelName,
        "street": street,
        "city": city,
        "zipcode": zipcode,
        "state": state,
        "country": country
    })
    return doc_ref.get().to_dict()

def addBooking(gid, rid, pointsUsed, totalPrice, startDate, endDate, numGuest, date):
    # Add rid to user's bookedRooms
    doc_ref = db.collection("user").document(gid)
    x = doc_ref.get().to_dict()["bookedRooms"]
    x.append(rid)
    doc_ref.update({
        'bookedRooms' : x
    })

    doc_ref = db.collection("booking").add({
        'gid': gid,
        'rid': rid,
        'pointsUsed': pointsUsed,
        'totalPrice': totalPrice,
        'startDate': startDate,
        'endDate': endDate,
        'numGuest': numGuest,
        'date': date
    })
    docs = db.collection("booking").where(filter=FieldFilter("gid", "==", gid)).where(filter=FieldFilter("rid", "==", rid)).stream()
    for doc in docs:
        return doc.to_dict()
    return docs[0].to_dict()

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

    addBooking('RID HERE', 'UID HERE', "11/17/2023" , "11/27/2023")

def checkUserIsLoggedIn():
    # Check if user is logged in
    return pyrebase_auth.current_user is not None

def checkUidExists(uid):
    # Check if user is logged in
    return db.collection("user").document(uid).get().exists

# Function to return uid of current user
def getUid():
    # check if user is logged in, throw an error if user is not
    if checkUserIsLoggedIn() == False:
            abort(make_response(jsonify(message="User is not logged in"), 404))
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

def getUserEmail():
    user = auth.get_user(getUid())
    email = user.email
    return email

def getUserPhone():
    user = auth.get_user(getUid())
    phone = user.phone_number
    return phone


# Update password on Authenication
def updatePassword(uid, newPassword):
    user = auth.update_user(
        uid,
        password = newPassword)

# Update basic user information
def updateInfomation(uid, email, phone, firstName, lastName):
    # Firestore Database
    doc_ref = db.collection("user").document(uid)
    doc_ref.update({
        'email' : email,
       'firstName': firstName,
        'lastName': lastName,
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
    room_ids = getRoomIds(uid)
    # Checks if there is room ids
    if(room_ids[0] != 0):
        # Update hotel name for all room listing
        updateHotelForRoom(uid, hotelName, state, street, zip, country, city)

    # Update all hotel details
    doc_ref = db.collection("user").document(uid)
    doc_ref.update({
        "hotelName": hotelName,
        "street": street,
        "city": city,
        "zipcode": zip,
        "state": state,
        "country": country
    })

# Update room listing
def update_room(uid, rid, price, fromDate, toDate, beds, guests, bathrooms, bedType, image, amenities):
    room_ref = db.collection("room").document(rid)
    hotel_ref = db.collection('user').document(uid)
    hotelDoc = hotel_ref.get().to_dict()
    # Create a dictionary with the provided input
    updated_data = {
        "hotelName": hotelDoc['hotelName'],
        "street_name": hotelDoc['street'],
        "zipCode": hotelDoc['zipcode'],
        "city": hotelDoc['city'],
        "state": hotelDoc['state'],
        "country": hotelDoc['country'],
        "price": price,
        "startDate": fromDate,
        "endDate": toDate,
        "numberOfBeds": beds,
        "numberGuests": guests,
        "numberOfBathrooms": bathrooms,
        "bedType": bedType,
        "imageUrl": image,
        "Amenities": amenities,
    }

    # Update the document with the provided data
    room_ref.update(updated_data)



# Update hotel name for room collection if it is not booked
def updateHotelForRoom(uid, new_hotel_name, state, streetName,zipcode, country, city):
    room_ids = getRoomIds(uid)
    # For each room listing, change the naem
    for rids in room_ids:
        room_ref = db.collection("room").document(str(rids))

        # Update the hotelName field in the room document
        room_ref.update({
            "hotelName": new_hotel_name,
            "state": state,
            "street_name": streetName,
            "zipcode": zipcode,
            "country": country,
            "city": city})


# Checks if any user has booked the hotel 
def isBooked():
    room_ids = getRoomIds()
    # Check if there's no rid
    if room_ids[0] == 0:
        return False
    # If there is rid --> loop
    for rid in room_ids:
        room_ref = db.collection("booking").document(str(rid))
        room_doc = room_ref.get()
        # Check if rid is in booking collection 
        if room_doc.exists:
            return True

    return False

def roomBooked(rid):
    # Search booking collection for rid
    room_ref = db.collection("booking").document(str(rid))
    room_doc = room_ref.get()
    # Check if rid is in booking collection 
    if room_doc.exists:
        return True
    else:
        return False
    
# Get room ids array from hotel user 
def getGuestBookedRooms(uid):
    # Get hotel information
    doc_ref = db.collection("user").document(uid)
    doc_data = doc_ref.get().to_dict()

    # Get guest's bookedRooms array field
    room_ids = doc_data.get('bookedRooms', [])
    return room_ids
    

# Get room ids array from hotel user 
def getRoomIds(uid):
    # Get hotel information
    doc_ref = db.collection("user").document(uid)
    doc_data = doc_ref.get().to_dict()

    # Get the 'roomIds' array field
    room_ids = doc_data.get('listedRooms', [])
    return room_ids

def checkIfRoomExists(rid):
    return db.collection("room").document(rid).get().exists


def getHotelName():
    user_ref = db.collection("user").document(getUid())
    user_data = user_ref.get().to_dict()
    hotel_name = user_data['hotelName']
    return hotel_name


def getAccountType():
    user_ref = db.collection("user").document(getUid())
    userDoc = user_ref.get().to_dict()
    print(userDoc)
    accountType = userDoc['accountType']
    return accountType

# Function to modify user's information
#def changeGuestInfo(email, phone, password, first_name, ):
