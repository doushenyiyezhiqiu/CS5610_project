from app import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'  # Explicitly set the table name
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)  # Added this line for the description
    price = db.Column(db.Numeric(10, 2))  # Updated this line for the price

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'description': self.description,  # Include description in the dictionary
            'price': str(self.price)  # Include price; convert to string for JSON compatibility
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    shippingAddress = db.Column(db.String(255), nullable=False)
    shippingCity = db.Column(db.String(255), nullable=False)
    shippingState = db.Column(db.String(255), nullable=False)
    shippingZipCode = db.Column(db.String(255), nullable=False)
    billingAddress = db.Column(db.String(255), nullable=False)
    billingCity = db.Column(db.String(255), nullable=False)
    billingState = db.Column(db.String(255), nullable=False)
    billingZipCode = db.Column(db.String(255), nullable=False)
    creditCardNumber = db.Column(db.String(255), nullable=False)
    creditCardExpirationDate = db.Column(db.String(255), nullable=False)
    creditCardCvv = db.Column(db.String(255), nullable=False)
    totalAmount = db.Column(db.Numeric(10, 2), nullable=False)
    orderDate = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'shippingAddress': self.shippingAddress,
            'shippingCity': self.shippingCity,
            'shippingState': self.shippingState,
            'shippingZipCode': self.shippingZipCode,
            'billingAddress': self.billingAddress,
            'billingCity': self.billingCity,
            'billingState': self.billingState,
            'billingZipCode': self.billingZipCode,
            'creditCardNumber': self.creditCardNumber,
            'creditCardExpirationDate': self.creditCardExpirationDate,
            'credictCardCvv': self.creditCardCvv,
            'totalAmount': self.totalAmount,
            'orderDate': self.orderDate
        }

class OrderItem(db.Model):
    __tablename__ = 'order_item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    orderId = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unitPrice = db.Column(db.Numeric(10, 2), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'orderId': self.orderId,
            'productId': self.productId,
            'quantity': self.quantity,
            'unitPrice': str(self.unitPrice),
            'imageUrl': self.imageUrl
        }


