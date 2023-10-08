import pyrebase
# ----------------IMPORTANT-------------------\
# pip install pyrebase4        run command
config = {
"apiKey": "AIzaSyBSFok_KWaBdRyXkdrqektCu8E0rYyhV5Y",
"authDomain": "innsight-87ed1.firebaseapp.com",
"projectId": "innsight-87ed1",
"databaseURL": "https://databaseName.firebaseio.com",
"storageBucket": "innsight-87ed1.appspot.com"
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

# created a user
# auth.create_user_with_email_and_password('test123@email.com', '123456')

# sign a user
user = auth.sign_in_with_email_and_password('test123@email.com', '123456')
print(user)

