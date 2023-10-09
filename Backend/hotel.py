from database import auth, pyrebase_auth
from flask import Flask, request, jsonify, render_template

# sign a user
def hotelLogin(email, password):
    user = pyrebase_auth.sign_in_with_email_and_password(email, password)
    return user

def hotel_func(app):
    @app.route('/hotel_login', methods=['GET', 'POST'])
    def hotel_login():
        if request.method == 'POST':
            email = request.form['email']
            password = request.form['password']
            # Check if the input is an email or a phone number
            if '@' in email:  # Assume it's an email
                try:
                    usr = auth.get_user_by_email(email)
                except auth.UserNotFoundError:
                    print("No user with that email")
                    return render_template("guest_login.html", emailError=True)
            try:
                # Authenticate the user with email and password
                userData = hotelLogin(email, password)
                uid =  auth.get_user_by_email(email).uid
                # Add uid to user's information
                userData['uid'] = uid
                # Return user's information
                return jsonify(userData)
            
            except Exception as e:
                print(e)
            # Handle incorrect password
            print("Password does not match")
            return render_template("guest_login.html", passwordError=True)

        return render_template("guest_login.html")
    
    @app.route('/getUid', methods=['GET', 'POST'])
    def get_Uid():
        return getUid()
    
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

    
