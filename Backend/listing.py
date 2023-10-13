import firebase_admin
import database
import pyrebase
import requests
import datetime
from datetime import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, make_response, abort
from database import  updatePassword, getUid, updateInfomation, update_room, roomBooked

def listing_modification_func(app):
    @app.rout('/ListingMod', methods = ['POST'])
    def listing_modification():
        uid = getUid()
        print("HELO")
        #get uid in db
        firebase_admin.get_app()
       
       
        # Get JSON data from frontent 
        data = request.get_json()
        print(data['fromDate'])
        print(data['toDate'])
        amenities = []
        for dict in data['amenities']:
            key = list(dict.keys())[0]
            if dict[key] == True:
                amenities.append(key)
        print(amenities)     
        if roomBooked() == False:
            #cYXBww5bSw4nYbdv2RzM
            if is_start_date_before_or_on_end_date(data['fromDate'], data['toDate']):
                update_room(request.args['rid'], data['price'], format_date(data['fromDate']), format_date(data['toDate']), data['beds'], data['guests'], data['bathrooms'], data['bedType'], data['image'], amenities)
                return jsonify({'message': 'Listing modification was successful'})
            else:
                abort(make_response(jsonify(message="Start date cannot be after end date"), 400))
        else:
            abort(make_response(jsonify(message="Room is booked. Changes are not allowed."), 403))
    


def format_date(input_date):
    # Split the date into components
    month, day, year = input_date.split('/')

    # Define a list of month names
    month_names = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    # Get the month name based on the month number
    month_name = month_names[int(month) - 1]

    # Format the date
    formatted_date = f'{month_name} {int(day)}, {year}'

    return formatted_date


def is_start_date_before_or_on_end_date(start_date_str, end_date_str):
    # Convert the date strings to datetime objects
    start_date = datetime.strptime(start_date_str, "%m/%d/%Y")
    end_date = datetime.strptime(end_date_str, "%m/%d/%Y")

    # Compare the start and end dates
    return start_date <= end_date
