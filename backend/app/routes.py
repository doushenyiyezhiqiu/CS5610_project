from flask import jsonify, request

from app import app, db
from app.models import Product

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