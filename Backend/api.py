import json
from database import db
 
# Opening JSON file
f = open('C:\\Users\\haily\\Documents\\Cmpe_165\\cmpe165-likehome\\Backend\\hotels.json')
 
# returns JSON object as 
# a dictionary
#data = json.load(f)
 
# Iterating through the json
# list
# for i in range(len(data)):
#     hotelData = {
#         "street_name": data[i]['addressline1'],
#         "zipcode": data[i]['zipcode'],
#         "city": data[i]['city'],
#         "state": data[i]['state'],
#         "country": data[i]['country'],
#         "basicInformation": data[i]['overview'],
#         "imageUrl": [data[i]['photo1'],data[i]['photo2'],data[i]['photo3'],data[i]['photo4'],data[i]['photo5']],
#         "starRating": data[i]['star_rating'],
#         "ratingAvg": data[i]['rating_average']
#     }
#     ref = db.collection('hotelApi').document(data[i]['hotel_name']).set(
#         hotelData
#     )
    
 
# Closing file
# f.close()