from amadeus import Client, ResponseError
# -------Important-----------
# pip install amadeus
# Register your amedeus acc first
# Set Up Keys
amadeus = Client(
    client_id='PWxU8xBCAQ5qCpPadnt1tpRxlRBCoH7M',
    client_secret='T8THjHqgTNy7ZpxC'
)

# This url generates a list of hotels within a city and a certain radius. The list is actually really long at 5km
def get_hotels_from_api(theCityCode, theRadius):
    try:
        response = amadeus.get('/v1/reference-data/locations/hotels/by-city', cityCode=theCityCode, radius=theRadius, radiusUnit='KM')
        # Returns an array of hotel objects
        return response.data
    except ResponseError as error:
        print(error)

def get_hotel_info_by_id(hotel_id):
    try:
        response = amadeus.shopping.hotel_offer_search('PAR').get()
        return response.data
    except ResponseError as error:
        print(error)

#print(get_hotels_from_api('LAX', 2))
#print(get_hotel_info_by_id('')) 
