from app import db

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

