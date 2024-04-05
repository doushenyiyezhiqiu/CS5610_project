from flask import jsonify, request
from app import app, db
from app.models import Product, Order, OrderItem

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
        "billingZipCode", "creditCardNumber", "creditCardExpirationDate",
        "creditCardCvv", "totalAmount"
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
            creditCardNumber=request.json['creditCardNumber'],
            creditCardExpirationDate=request.json['creditCardExpirationDate'],
            creditCardCvv=request.json['creditCardCvv'],
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
    orders = Order.query.all()
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