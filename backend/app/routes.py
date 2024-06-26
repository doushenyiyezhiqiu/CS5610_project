import stripe

from flask import jsonify, request
from app import app, db
from app.models import Product, Order, OrderItem

stripe.api_key = 'sk_test_51Ngg0rEHLw8pQL0l5RhCliYeJapwpQaILiXdXFmrGSGZ7zeTJzoLojoFs1MVZSptoRFxXgFzCUdbH47sgbTWvzl200LDODDY9w'
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/products/<int:productId>', methods=['GET'])
def get_product(productId):
    product = Product.query.get(productId)
    if product:
        return jsonify(product.to_dict())
    else:
        return jsonify({"error": "Product not found"}), 404

@app.route('/products/search', methods=['GET'])
def search_products():
    # Retrieve the search query parameter
    search_query = request.args.get('query', '')
    # Filter products by names that contain the search term
    products = Product.query.filter(Product.name.ilike(f'%{search_query}%')).all()
    return jsonify([product.to_dict() for product in products])

@app.route('/orders', methods=['POST'])
def create_order():
    if not request.json:
        return jsonify({"error": "Request must be JSON"}), 400

    required_fields = [
        "firstName", "lastName", "email", "shippingAddress",
        "shippingCity", "shippingState", "shippingZipCode",
        "billingAddress", "billingCity", "billingState",
        "billingZipCode", "totalAmount"
    ]

    if not all(field in request.json for field in required_fields):
        print(request.json)
        return jsonify({"error": "Missing fields in request data"}), 400

    try:
        data = request.get_json()
        order = Order(
            firstName=request.json['firstName'],
            lastName=request.json['lastName'],
            email=request.json['email'],
            shippingAddress=request.json['shippingAddress'],
            shippingCity=request.json['shippingCity'],
            shippingState=request.json['shippingState'],
            shippingZipCode=request.json['shippingZipCode'],
            billingAddress=request.json['billingAddress'],
            billingCity=request.json['billingCity'],
            billingState=request.json['billingState'],
            billingZipCode=request.json['billingZipCode'],
            totalAmount=request.json['totalAmount']
        )
        db.session.add(order)
        db.session.flush()

        for item in data['cartItems']:
            order_item = OrderItem(
                orderId=order.id,
                productId=item['id'],
                quantity=item['quantity'],
                unitPrice=item['price'],
                imageUrl=item['imageUrl'],
                name=item['name']
            )
            db.session.add(order_item)

        db.session.commit()
        return jsonify(order.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        # Return an explicit error response
        return jsonify({"error": "Failed to create order", "message": str(e)}), 500


@app.route('/order-history', methods=['GET'])
def order_history():
    email = request.args.get('email')  # Get the email query parameter
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    orders = Order.query.filter_by(email=email).all()
    order_list = []
    for order in orders:
        order_items = OrderItem.query.filter_by(orderId=order.id).all()
        items_list = [{
            'imageUrl': item.imageUrl,
            'name': item.name,  # Adjust according to your model attributes
            'unitPrice': str(item.unitPrice),
            'quantity': item.quantity
        } for item in order_items]

        order_data = {
            'id': order.id,
            'totalAmount': str(order.totalAmount),
            'items': items_list,
            'orderDate': order.orderDate
        }
        order_list.append(order_data)

    return jsonify(order_list)

@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    data = request.json
    try:
        # Create a PaymentIntent with the order amount and currency
        payment_intent = stripe.PaymentIntent.create(
            amount=data['amount'],  # Amount is in cents
            currency='usd',
            payment_method=data['paymentMethodId'],
            confirmation_method='manual',
            confirm=True,
            return_url='http://localhost:3000'
        )
        return jsonify(payment_intent)
    except stripe.error.StripeError as e:
        return jsonify(error=str(e)), 400