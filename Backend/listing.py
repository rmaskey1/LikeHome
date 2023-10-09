from flask import Flask, request, jsonify
def listing_func(app):
    @app.route('/getAddListing', methods=['POST'])
    def get_listing_from_react():
        data = request.get_json()
        # Isabel's Create Listing JSON
        
        # Store in firestore database
        return jsonify({'message': 'Data received successfully'})