drop database if exists `my-ecommerce`;
create database `my-ecommerce`;

use `my-ecommerce`;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    shippingAddress VARCHAR(255) NOT NULL,
    shippingCity VARCHAR(255) NOT NULL,
    shippingState VARCHAR(255) NOT NULL,
    shippingZipCode VARCHAR(255) NOT NULL,
    billingAddress VARCHAR(255) NOT NULL,
    billingCity VARCHAR(255) NOT NULL,
    billingState VARCHAR(255) NOT NULL,
    billingZipCode VARCHAR(255) NOT NULL,
    creditCardNumber VARCHAR(255) NOT NULL,
    creditCardExpirationDate VARCHAR(255) NOT NULL,
    creditCardCvv VARCHAR(255) NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    orderId INT,
    productId INT,
    quantity INT,
    unitPrice DECIMAL(10, 2),
    imageUrl VARCHAR(255),
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Basketball',
    '/images/basketball.png',
    'A basketball is a spherical ball used in basketball games. Basketballs typically range in size from very small promotional items only a few inches in diameter to extra large balls nearly a foot in diameter used in training exercises.',
    50.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Soccer',
    '/images/soccer.png',
    'A soccer ball, also known as a football in most countries outside the US, is a durable ball used in the sport of association football. Designed for play on various surfaces, soccer balls are crafted to be kicked and are used in a game celebrated worldwide for its simplicity and team spirit.',
    50.00
);


