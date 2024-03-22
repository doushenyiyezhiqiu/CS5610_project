from app import app, db
from app.models import Product


if __name__ == '__main__':

    with app.app_context():
        db.create_all()
        products = Product.query.all()
        for product in products:
            print(product.name)
            print(product.image_url)


    app.run(debug=True)

