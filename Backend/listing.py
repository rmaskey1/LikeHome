import firebase_admin
import database
import pyrebase
import requests
import datetime
from datetime import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, make_response, abort
from database import  updatePassword, getUid, updateInfomation, update_room

def listing_modification_func(app):
    @app.rout('/ListingMod', methods = ['POST', 'GET'])
    def listing_modification():
        uid = getUid()
        #get uid in db
        firebase_admin.get_app()
       

        # Get JSON data from frontent 
        data = request.get_json()


        if is_start_date_before_or_on_end_date(data['startDate'], data['endDate']):
            update_room(data['rid'], data['Amenities'], data['bedType'], data['city'], data['country'], data['endDate'], data['hotelName'], data['imageUrl'], data['numberGuests'], data['numberOfBathrooms'], data['numberOfBeds'], data['price'], data['startDate'], data['state'], data['street_name'], data['zipcode'])




def is_start_date_before_or_on_end_date(start_date_str, end_date_str):
    # Convert the date strings to datetime objects
    start_date = datetime.strptime(start_date_str, "%m/%d/%Y")
    end_date = datetime.strptime(end_date_str, "%m/%d/%Y")

    # Compare the start and end dates
    return start_date <= end_date
