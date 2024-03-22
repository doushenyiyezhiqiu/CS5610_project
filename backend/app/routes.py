from flask import jsonify
from flask_cors import CORS

from app import app, db
from app.models import Product

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])
