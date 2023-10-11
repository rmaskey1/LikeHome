import firebase_admin
import database
import pyrebase
import requests
import datetime
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify, make_response, abort
from database import  updatePassword, getUid, updateInfomation

def listing_modification_func(app):
    @app.rout('/ListingMod', methods = ['POST', 'GET'])
    def listing_modification():
        uid = getUid()