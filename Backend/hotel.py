from database import auth, pyrebase_auth
from flask import Flask, request, jsonify, render_template
import requests

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
    
    @app.route('/hotelUid', methods=['GET', 'POST'])
    def hotel_uid():
        return {
            "user": pyrebase_auth.current_user
        }
    
    @app.route('/hotel_mod', methods=['GET', 'POST'])
    def hotel_modification():
        def fetch_json_from_url(url):
            try:
                response = requests.get(url)
                response.raise_for_status()  # Check for any HTTP errors

                # Assuming the response is in JSON format
                json_data = response.json()

                return json_data

            except requests.exceptions.HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')
            except Exception as err:
                print(f'An error occurred: {err}')

        # Example usage
        url = 'http://localhost:8000/hotelUid'  # Replace with your URL
        json_data = fetch_json_from_url(url)

        if json_data:
            print(json_data)
        return "Hello"