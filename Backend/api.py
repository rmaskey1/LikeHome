import json
from database import db, firestore
import secrets
import string
 
# Opening JSON file
f = open('C:\\Users\\haily\\Documents\\Cmpe_165\\cmpe165-likehome\\Backend\\hotels.json')
 
data = json.load(f)
 
# for i in range(len(data)):
#     hotelData = {
#         "streetName": data[i]['addressline1'],
#         "zipCode": data[i]['zipcode'],
#         "city": data[i]['city'],
#         "state": data[i]['state'],
#         "country": data[i]['country'],
#         "basicInformation": data[i]['overview'],
#         "imageUrl": [data[i]['photo1'],data[i]['photo2'],data[i]['photo3'],data[i]['photo4'],data[i]['photo5']],
#         "rating": 0,
#         "roomIds": [0]
#     }
#     ref = db.collection('hotelApi').document(data[i]['hotel_name']).set(
#         hotelData
#     )

# def generate_random_id(length):
#     alphabet = string.ascii_letters + string.digits
#     return ''.join(secrets.choice(alphabet) for _ in range(length))

# hotel_ref = db.collection('hotelApi').document('Everbright Convention & Exhibition Centre International Hotel')
# data = hotel_ref.get().to_dict()
# autoId = generate_random_id(20)
# ref = db.collection('room').document(autoId).set({
#     "hotelName": "Everbright Convention & Exhibition Centre International Hotel",
#     "street_name": data['streetName'],
#     "zipcode": data['zipCode'],
#     "city": data['city'],
#     "state": data['state'],
#     "country": data['country'],
#     "price": 90,
#     "numberOfBeds": 2,
#     "bedType": "Twin Bed",
#     "numberGuests": 2,
#     "numberOfBathrooms": 1,
#     "Amenities": ['Air Conditioning', 'Refrigerator', 'Free Wifi', 'TV'],
#     "startDate": "Nov 1",
#     "endDate": "Nov, 2",
#     "imageUrl": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSceNmRMTfozNwoBpoYdcpdZH-WMWRv49AtwdkFaePcY3ucKtYG"
# })
# hotel_ref.update({"roomIds": firestore.ArrayUnion([autoId])})
    
 
# Closing file
f.close()
