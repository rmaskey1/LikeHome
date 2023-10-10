from amadeus import Client, ResponseError

amadeus = Client(
    client_id='PWxU8xBCAQ5qCpPadnt1tpRxlRBCoH7M',
    client_secret='T8THjHqgTNy7ZpxC'
)

def hotel_city(cityCode, checkInDate, checkOutDate):
    try:
        response = amadeus.get('/v2/shopping/hotel-offers', cityCode=cityCode, checkInDate=checkInDate, checkOutDate=checkOutDate)
        print(response.data)
    except ResponseError as error:
        print(error)

hotel_city('SFO', '2023-08-08', '2023-08-10')
