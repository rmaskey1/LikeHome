from database import db

def create_guest_collection(uid, first_name, last_name, email):
    guest_ref = db.collection("guests").document(f"{uid}")
    guest_ref.set({
        "account_type": "guest",
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "reward_points": 0,
        "booked_hotels": ["0"] # Default , can update later on
    })

def create_hotel_collection(uid, first_name, last_name, email, hotel_name):
    hotel_ref = db.collection("users").document(f"{uid}")
    hotel_ref.set({
        "account_type": "hotel",
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "hotel_name": hotel_name,
        "hotels_listed": ["0"] # Default , can update later on
    })

def create_admin_collection(uid, first_name, last_name, email):
    admin_ref = db.collection("users").document(f"{uid}")
    admin_ref.set({
        "account_type": "admin",
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
    })

def create_room_collection(data):
    # data is a dictionary that 
    room_ref = db.collection("rooms")
    room_ref.set({
        data
    })

def create_booking_collection(hid, uid, date_booked):
    booking_ref = db.collection("booking")
    booking_ref.set({
        "hid": hid,
        "uid": uid,
        "date_booked": date_booked,
        "isBooked": True #Default
    })

