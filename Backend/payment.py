import stripe
from flask import Flask, request, jsonify, make_response, abort
from database import getCardToken

stripe.api_key = "sk_test_51O7eg3BeDJOROtaCd2D3qBBa3G32SwNfI0c0Z9FxKbs8gTFKxOZmrKRlgZEehOweHAKQvnGvivNnB25eFIwtYguf00nnU3B80B"

def payment_func(app):
    @app.route('/charge', methods=['POST'])
    def charge():
        if request.method == 'POST':
            try:
                # Get credit card information from the form
                cardToken = getCardToken(request.form['cardNumber'])
                # exp_month = request.form['exp_month']
                # exp_year = request.form['exp_year']
                # cvc = request.form['cvc']
                totalPrice = int(request.form['totalPrice']) * 100  # Convert amount to cents
                
                charge = stripe.Charge.create(
                    amount=totalPrice,
                    currency='usd',
                    source=cardToken,
                    description='Payment for your order'
                )

                return jsonify({
                    'message': 'Payment successful!',
                    
                })
            except Exception as e:
                return jsonify({'error': str(e)})