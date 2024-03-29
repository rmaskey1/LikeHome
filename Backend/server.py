from guest import guest_modification_func
from hotel import hotel_modification_func, format_date
import firebase_admin
import database
# import pyrebase
from firebase_admin import credentials, firestore, auth
from flask import Flask, abort, make_response, request, jsonify, render_template, redirect, url_for, session
from flask_cors import CORS
from database import addUser, addHotelInfo, pyrebase_auth, db, getUid, addBooking, roomBooked, checkIfRoomExists, getGuestBookedRooms, getAccountType, getCardToken, get_hid_from_user_or_hotel_api, check_guest_history
from guest import is_valid_password, is_valid_phone_number
from datetime import datetime
import stripe
from google.cloud.firestore_v1.base_query import FieldFilter

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return redirect(url_for("user_selection"))


guest_modification_func(app)

hotel_modification_func(app)

# User Type Selection Function


@app.route('/user_selection', methods=['POST', 'GET'])
def user_selection():
    # Start on the user selection page by default
    return render_template("user_selection.html")

# Guest Sign Up Function


@app.route('/signup', methods=['POST', 'GET'])
def signup():
    # # firebase_admin.get_app()
    # if request.method == "POST":
    #     # Get form data
    #     firstName = request.form['firstName']
    #     lastName = request.form['lastName']
    #     email = request.form['email']
    #     password = request.form['password']
    #     phone = request.form['phone']
    #     usertype = request.form['usertype'] # User chooses what type of user they are (guest or hotel)
    data = request.get_json()  # Assuming JSON data is sent
    firstName = data['firstname']
    lastName = data['lastname']
    email = data['email']
    password = data['password']
    phone = data['phone']
    usertype = data['role']

    try:  # Check if entered email is already in use
        # Returns auth.UserNotFoundError if email does not exist, jumps to first except block
        usr = auth.get_user_by_email(email)
        print("Email already in use.")
        abort(make_response(jsonify(message="Email already in use."), 409))
    except auth.UserNotFoundError:
        try:  # Check if entered phone number is already in use
            if is_valid_phone_number(phone):  # Check if phone number is valid
                # Returns auth.UserNotFoundError if email does not exist, jumps to second except block
                usr = auth.get_user_by_phone_number(phone)
                print("Phone number already in use.")
                abort(make_response(
                    jsonify(message="Phone number already in use."), 418))
            else:  # Invalid phone number error
                abort(make_response(
                    jsonify(message="Please enter valid phone number"), 419))
        except auth.UserNotFoundError:
            if is_valid_password(password):  # Check if password is valid
                if usertype == "guest":  # If the input is 'guest', redirect to guest signup page
                    user = addUser(email, phone, password,
                                   firstName, lastName, "guest")
                    return jsonify({"uid": user.uid, "usertype": "guest"})
                if usertype == "hotel":  # If the input is 'hotel', redirect to hotel signup page
                    user = addUser(email, phone, password,
                                   firstName, lastName, "hotel")
                    return jsonify({"uid": user.uid, "usertype": "hotel"})
                if usertype == "admin":  # If the input is 'guest', redirect to guest signup page
                    user = addUser(email, phone, password,
                                   firstName, lastName, "admin")
                    return jsonify({"uid": user.uid, "usertype": "admin"})
            else:  # Invalid password error
                abort(make_response(
                    jsonify(message="Password should be at least 6 characters"), 400))

    # else:
    abort(make_response(jsonify(message="User role not found."), 400))


@app.route('/hotel_signup', methods=['POST', 'GET'])  # ?uid=<uid>
def hotel_signup():
    data = request.get_json()  # Assuming JSON data is sent
    userId = request.args['uid']
    hotelName = data['hotelName']
    street = data['street']
    city = data['city']
    zipcode = data['zipcode']
    state = data['state']
    country = data['country']
    hotel = addHotelInfo(userId, hotelName, street,
                         city, zipcode, state, country)
    return jsonify(hotel)


def login_user(email, password):
    user = pyrebase_auth.sign_in_with_email_and_password(email, password)
    return user


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:  # Check if entered email is already in use
        # Returns auth.UserNotFoundError if email does not exist, jumps to first except block
        usr = auth.get_user_by_email(data['email'])

        try:
            # Authenticate the user with email and password
            userData = login_user(data['email'], data['password'])
            user_ref = db.collection("user").document(userData['localId'])
            userData['info'] = user_ref.get().to_dict()
            # Return user's information
            return jsonify(userData)
        except Exception as e:
            abort(make_response(jsonify(
                message="Your password is incorrect"
            ), 401))
    except auth.UserNotFoundError:
        print("Email does not exist.")
        abort(make_response(jsonify(message="Email does not exist"), 404))

# No payment fields yet

# Payment integrated with adding booking
stripe.api_key = "sk_test_51O7eg3BeDJOROtaCd2D3qBBa3G32SwNfI0c0Z9FxKbs8gTFKxOZmrKRlgZEehOweHAKQvnGvivNnB25eFIwtYguf00nnU3B80B"
# Expecting rid passed in as variable
@app.route('/bookings', methods=['GET', 'POST'])
def bookings():
    if request.method == 'POST':
        rid = request.args['rid']
        gid = getUid()
        data = request.get_json()
        print(data)
        # time = datetime.now().strftime("%H:%M:%S")
        
        # #checks if room is booked for the selected date
        # print("CHECK FOR DOUBLE BOOKING:")
        # startDate=datetime.strptime(data['startDate'], "%b %d, %Y")
        # endDate=datetime.strptime(data['endDate'], "%b %d, %Y")
        
        # #get all bookings under this uid
        # bookings = db.collection("booking").where("gid", "==", gid).stream()
        # #check the date range
        # for booking in bookings:
        #     booking_data = booking.to_dict()
        #     print(booking_data)
        #     bookingStart = datetime.strptime(booking_data['startDate'], "%b %d, %Y")
        #     bookingEnd = datetime.strptime(booking_data['endDate'], "%b %d, %Y")
        #     #check if above query date range is occupied. if it is, no booking allowed.
        #     if not (endDate < bookingStart or startDate > bookingEnd):
        #         abort(make_response(jsonify(message="You've already booked rooms within this date range"), 400))
        
        try:
            # Get credit card information from the form
            cardToken = getCardToken(data['cardNumber'])
            # exp_month = request.form['exp_month']
            # exp_year = request.form['exp_year']
            # cvc = request.form['cvc']
            totalPrice = int(data['totalPrice'] * 100)  # Convert amount to cents
            pointsUsed = int(data['pointsUsed'])  # Points used in the booking
            rewardPointsEarned = int(data['rewardPointsEarned'])  # Points earned from booking
            # Check if the user has enough rewardPoints to cover the pointsUsed
            user_ref = db.collection('user').document(gid)
            user_data = user_ref.get().to_dict()
            rewardPoints = user_data.get('rewardPoints', 0)

            # Deduct pointsUsed from rewardPoints
            new_rewardPoints = int(rewardPoints) + int(rewardPointsEarned) - int(pointsUsed)
            user_ref.update({'rewardPoints': new_rewardPoints})
            
            if totalPrice > 0:
                charge = stripe.Charge.create(
                    amount=totalPrice,
                    currency='usd',
                    source=cardToken,
                    description='Payment for your booking'
                )
                booking = addBooking(gid, rid, data['pointsUsed'], data['totalPrice'], data['startDate'], data['endDate'], data['numGuest'], charge.id)
                return jsonify(booking)
            else:
                booking = addBooking(gid, rid, data['pointsUsed'], data['totalPrice'], data['startDate'], data['endDate'], data['numGuest'], "none")
                return jsonify(booking)
        except Exception as e:
            return jsonify({'error': str(e.with_traceback())})
        

    # Get guest's mybookings
    if request.method == 'GET':
        # Can return empty array if there are no bookings
        if getAccountType() == 'hotel':
            abort(make_response(jsonify(message="User is not a guest!"), 404))
        booking_docs = db.collection("booking").where("gid", "==", getUid()).stream()
        bookedRooms = []
        for doc in booking_docs:
            print(doc.to_dict())
            booking_ref = doc.to_dict()
            id = booking_ref['rid']
            # Each id corresponds to the rid of a booked room
            if db.collection("room").document(id).get().exists == True:
                bookedRoom_data = db.collection("room").document(id).get().to_dict()
                bookedRoom_data['rid'] = id
                bookedRoom_data['reserved_guests'] = booking_ref['numGuest']
                bookedRoom_data['checkinDate'] = doc.to_dict()['startDate']
                bookedRoom_data['checkoutDate'] = doc.to_dict()['endDate']
                bookedRooms.append(bookedRoom_data)
        return jsonify(bookedRooms)

# No get function, must call put/delete methods from frontend to work
# No payment fields yet


@app.route('/bookings/<rid>', methods=['GET', 'PUT', 'DELETE'])
def modify_bookings(rid):
    # test if rid exists
    if checkIfRoomExists(rid) == False:
        abort(make_response(jsonify(message="Rid and room does not exist"), 400))

    # Modify Booking Here
    if request.method == 'PUT':
        numGuest = request.get_json()['guests']
        endDate = request.get_json()['endDate']
        booking_ref = db.collection("booking")
        # Search for the specific booking and update it
        query_ref = booking_ref.where(
            "rid", "==", rid).where("gid", "==", getUid())
        docs = query_ref.stream()
        # Added updated data here, 4 is sample data
        updatedData = {
            "numGuest": numGuest,
            "endDate": format_date(endDate)
        }
        for doc in docs:
            doc.reference.update(updatedData)
        return jsonify(message="Modification Successfull")

    # Cancel Booking Here
    elif request.method == 'DELETE':
        booking_ref = db.collection("booking")
        # Search for the specific booking, give refund/charge cancellation fee, and delete it
        query_ref = booking_ref.where(
            "rid", "==", rid).where("gid", "==", getUid())
        docs = query_ref.stream()
        for doc in docs:
            # Cancellation refund calculated using total - cancellation fee
            # No need for customer payment
            try:
                if doc.to_dict()['chargeID'] != "none":
                    chargeID = doc.to_dict()['chargeID']
                    total = stripe.Charge.retrieve(chargeID).amount
                    cancellationFee = request.get_json()['cancellationFee']
                    # Creating the refund using the id of the charge made to them for their booking
                    stripe.Refund.create(
                        charge=chargeID,
                        amount=total-(int(cancellationFee*100))
                    )
            except Exception as e:
                return jsonify({'error': str(e)})
            doc.reference.delete()
        # Delete the booked room in guest's bookedRooms array
        uid = getUid()
        user_ref = db.collection('user').document(uid)
        user_ref.update({"bookedRooms": firestore.ArrayRemove([rid])})

        return jsonify(message="Deletion Successfull")

@app.route('/update_reward_points/', methods=['POST'])
def update_reward_points():
    try:
        uid = getUid()
        # Query the 'booking' collection
        booking_ref = db.collection('booking')
        user_ref = db.collection('user').document(uid)
        user_data = user_ref.get().to_dict()

        if user_data is None:
            abort(make_response(
                jsonify({'error': 'User not found'}), 404))

        reward_points = user_data.get('rewardPoints', 0)

        # Iterate through the booking documents for the specified UID
        for booking_doc in booking_ref.where('gid', '==', uid).stream():
            booking_data = booking_doc.to_dict()

            # Parse the endDate from the document (assuming it's in the format "Nov 2, 2023")
            end_date = datetime.strptime(booking_data['endDate'], "%b %d, %Y")

            # Get the current date
            today = datetime.today()

            # Check if the end date is before or on today's date
            if end_date <= today:
                
                bid = booking_doc.id  # Get the booking ID
                gid = booking_data.get('gid', '')
                rid = booking_data.get('rid', '')


                # find the hid with rid
                hid = get_hid_from_user_or_hotel_api(rid)

                if hid == 'unknown':
                    abort(make_response(
                        jsonify({'error': 'No hotel with that room'}), 404))

                # Check if a document with the same gid and hid already exists in 'pastBooking'
                past_booking_ref = db.collection('pastBooking')
                query = past_booking_ref.where('gid', '==', gid).where('hid', '==', hid).limit(1).stream()

                if not next(query, None):
                    # Check if user already have a review for that hotel
                    review_query = db.collection('review').where('hid', '==', hid).where('gid', '==', gid).limit(1).stream()
                    if not next(review_query, None):
                        # Add the bid, gid, and hid to the 'pastBooking' collection
                        past_booking_ref.document(bid).set({'gid': gid, 'hid': hid})


                total_price = booking_data.get('totalPrice', 0)

                # Calculate reward points (50% of the total price)
                reward_points += round(total_price * 0.5)

                # Delete the booking document
                booking_ref.document(booking_doc.id).delete()

                # If the user's 'bookedRooms' array contains the RID, remove it
                rid = booking_data.get('rid')
                if rid in user_data.get('bookedRooms', []):
                    booked_rooms = user_data['bookedRooms']
                    booked_rooms.remove(rid)
                    user_ref.update({'bookedRooms': booked_rooms})

                # Update the user's reward points in the 'user' collection
                user_ref.update({'rewardPoints': reward_points})

        return jsonify({'message': 'Reward points updated successfully'}), 200

    except Exception as e:
        abort(make_response(
            jsonify({'error': 'An error occurred', 'message': str(e)}), 500))
    
@app.route('/review', methods=['GET'])
def reviews():
    if request.method == 'GET':
        review_docs = db.collection('review').stream()
        data = []
        for doc in review_docs:
            temp = doc.to_dict()
            temp['id'] = doc.id
            data.append(temp)
        return jsonify(data)
    
@app.route('/review/<rid>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def review(rid):
    gid = getUid()
    docs = db.collection('review').where(filter=FieldFilter('rid', '==', rid)).where(filter=FieldFilter('gid', '==', gid))
    user_ref = db.collection("user").document(gid)
    user = user_ref.get().to_dict()

    if request.method == 'GET':
        temp = []
        docs = db.collection('review').where(filter=FieldFilter('rid', '==', rid)).stream()
        for doc in docs:
            dict = doc.to_dict()
            dict['id'] = doc.id
            temp.append(dict)
        return jsonify(temp)
    
    if request.method == 'POST':    
        data = request.get_json()
        if len(docs.get()) > 0:
            abort(make_response(jsonify(message="Review already exists"), 400))
        else:
            current_time = datetime.today()
            review_data = {
                "gid": gid,
                "rid": rid,
                "images": [],
                "rating": data['rating'],
                "text": data['text'],
                "title": data['title'],
                'createdTime': current_time,
                'lastModifiedTime': current_time,
                'name': user['firstName']
            }
            db.collection("review").add(review_data)
        return jsonify(review_data)
    
    elif request.method == 'PUT':
        data = request.get_json()
        if len(docs.get()) != 1:
            abort(make_response(jsonify(message="no review to edit"), 404))
        else:
            id = docs.get()[0].id
            doc_ref = db.collection('review').document(id)
            data['lastModifiedTime'] = datetime.today()
            doc_ref.update(data)
            return jsonify(doc_ref.get().to_dict())

        
    elif request.method == 'DELETE':
        for doc in docs.get():
            id = doc.id
            doc_ref = db.collection('review').document(id)
            doc_ref.delete()
        return jsonify(message="deleted")
    else:
        abort(make_response(jsonify(message="wrong method"), 405))

@app.route('/query', methods=['POST'])
def queryByRmAttribute():
    try:
        if request.method == 'POST':
            # Get JSON data from the frontend
            data = request.get_json()

            #amneties
            amenities=data['amenities']


            query = db.collection("room")
            # Generate list of amenities to filter based on true value, make sure it is lowercase and has no space or dashes
            filter = []
            for dict in amenities:
                key = list(dict.keys())[0]
                if (dict[key]==True):
                    filter.append(key.lower().replace(' ', '').replace('-', ''))


            bathrooms = data['bathrooms']
            bedType = data['bedType']
            beds = data['beds']
            guests = data['guests']
            minPrice = data['minPrice']
            maxPrice = data['maxPrice']

            #this part checks if each attribute is null or not. Shouldn't factor into query if it's null
            #bedType is str, not int

            results = query.stream()
            matching_rooms = []
            
            #
            for doc in results:
                add = False
                if 'Amenities' in doc.to_dict():
                    amenities = doc.to_dict()['Amenities']
                    if set(filter).issubset(set(amenities)):
                        add = True
                    if bathrooms is not None:
                        if doc.to_dict()['numberOfBathrooms'] != bathrooms:
                            add = False

                    if bedType is not None:
                        if bedType.lower() not in doc.to_dict()['bedType'].lower():
                            add = False
                    
                    if beds is not None:
                        if doc.to_dict()['numberOfBeds'] != beds:
                            add = False
                    
                    if guests is not None:
                        if doc.to_dict()['numberGuests'] != guests:
                            add = False
                    
                    if minPrice is not None:
                        if doc.to_dict()['price'] < minPrice:
                            add = False

                    if maxPrice is not None:
                        if doc.to_dict()['price'] > maxPrice:
                            add = False

                    if add:
                        listing = doc.to_dict()
                        listing['rid'] = doc.id
                        matching_rooms.append(listing)

            return jsonify(matching_rooms)
        
        else:
            return jsonify([])
      
    except Exception as e:
        print("Error querying rooms:", e)
        return jsonify([])
    




if __name__ == '__main__':
    app.debug = True
    app.run()