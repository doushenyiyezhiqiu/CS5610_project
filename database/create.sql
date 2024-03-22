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

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Basketball',
    'https://drive.google.com/file/d/1yTMorOjy2JGtm58g4RanZfg1VYynYgpf/preview',
    'A basketball is a spherical ball used in basketball games. Basketballs typically range in size from very small promotional items only a few inches in diameter to extra large balls nearly a foot in diameter used in training exercises.',
    50.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Soccer',
    'https://drive.google.com/file/d/1gjo5ko00nCxNmh2Gu1nB6nPHzZA2IMSp/preview',
    'A soccer ball, also known as a football in most countries outside the US, is a durable ball used in the sport of association football. Designed for play on various surfaces, soccer balls are crafted to be kicked and are used in a game celebrated worldwide for its simplicity and team spirit.',
    50.00
);


