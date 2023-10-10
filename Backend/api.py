import json
from database import db
 
# Opening JSON file
f = open('C:\\Users\\haily\\Documents\\Cmpe_165\\cmpe165-likehome\\Backend\\hotels.json')
 
data = json.load(f)
 
# for i in range(len(data)):
#     hotelData = {
#         "street_name": data[i]['addressline1'],
#         "zipcode": data[i]['zipcode'],
#         "city": data[i]['city'],
#         "state": data[i]['state'],
#         "country": data[i]['country'],
#         "basicInformation": data[i]['overview'],
#         "imageUrl": [data[i]['photo1'],data[i]['photo2'],data[i]['photo3'],data[i]['photo4'],data[i]['photo5']],
#         "rating": 0,
#         "room_ids": [0]
#     }
#     ref = db.collection('hotelApi').document(data[i]['hotel_name']).set(
#         hotelData
#     )

hotel_ref = db.collection('hotelApi').document('Catalonia Brussels Hotel')
data = hotel_ref.get().to_dict()
ref = db.collection('room').add({
    "hotelName": "Catalonia Brussels Hotel",
    "street_name": data['street_name'],
    "zipcode": data['zipcode'],
    "city": data['city'],
    "state": data['state'],
    "country": data['country'],
    "price": 90,
    "numberOfBeds": 2,
    "bedType": "Twin Bed",
    "numberGuests": 2,
    "numberOfBathrooms": 1,
    "Amenities": ['Air Conditioning', 'Refrigerator', 'Free Wifi', 'TV'],
    "startDate": "Nov 1",
    "endDate": "Nov, 2",
    "imageUrl": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSceNmRMTfozNwoBpoYdcpdZH-WMWRv49AtwdkFaePcY3ucKtYG"
})
    
 
# Closing file
f.close()