import firebase_admin
from firebase_admin import credentials, firestore, auth, exceptions
from flask import Flask, request, jsonify

# -----------IMPORTANT-------------
# 1. On your terminal execute this command "pip install firebase-admin"
# 2. Also install Flask: "pip install flask"
# 3. Download serviceAccountKey.json under resources in our discord channel
# 4. Drag that file and add it into backend folder if you have not done so
# 5. Make sure you are in cmpe165-likehome directory and not Backend directory
# 6. Run the python file
cred = credentials.Certificate("./Backend/serviceAccountKey.json")

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app(cred)
db = firestore.client()

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
            'password': password,
            'accountType': type
        })
    else:
        doc_ref = db.collection("user").document(user.uid).set({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'password': password,
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
# main()
