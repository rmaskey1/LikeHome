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
# hotel_ref = db.collection('hotelApi').stream()
# for doc in hotel_ref:
#     if len(doc.to_dict()['roomIds']) == 1:
#         print(f"{doc.id} => {doc.to_dict()['roomIds']}")
#         autoId = generate_random_id(20)
#         ref = db.collection('room').document(autoId).set({
#             "hotelName": doc.id,
#             "street_name": doc.to_dict()['streetName'],
#             "zipcode": doc.to_dict()['zipCode'],
#             "city": doc.to_dict()['city'],
#             "state": doc.to_dict()['state'],
#             "country": doc.to_dict()['country'],
#             "price": 90,
#             "numberOfBeds": 2,
#             "bedType": "Twin Bed",
#             "numberGuests": 2,
#             "numberOfBathrooms": 1,
#             "Amenities": ['Air Conditioning', 'Refrigerator', 'Free Wifi', 'TV'],
#             "startDate": "Nov 1, 2023",
#             "endDate": "Nov 2, 2023",
#             "imageUrl": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSceNmRMTfozNwoBpoYdcpdZH-WMWRv49AtwdkFaePcY3ucKtYG"
#         })
#         hotel = db.collection('hotelApi').document(doc.id)
#         hotel.update({"roomIds": [autoId]})

# # Get all documents in the collection
# room_docs = db.collection('room').stream()

# # Loop through each document
# for doc in room_docs:
#     # Get the amenities array from the document
#     amenities = doc.to_dict().get('Amenities', [])

#     # Convert each amenity to lowercase
#     lowercase_amenities = [amenity.lower().replace(' ', '').replace('-', '') for amenity in amenities]
    
#     # Update the document with the lowercase amenities
#     doc.reference.update({'Amenities': lowercase_amenities})

# Closing file
f.close()
