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
    'Wilson Basketball',
    '/images/basketball.png',
    'The Wilson basketball stands as a hallmark of quality and innovation in the sport. Engineered for peak performance, it features a composite 
    leather cover that provides exceptional grip and feel, making it suitable for both indoor and hardwood courts as well as outdoor play. The ball\'s construction 
    is designed for durability, maintaining its shape and bounce over extensive use. Wilson basketballs are recognized for their consistent air retention and moisture 
    management, ensuring a steady, reliable play experience. As the official ball of many leagues and tournaments, Wilson embodies commitment to the game through its fusion 
    of advanced technology and a deep understanding of players\' needs, elevating the basketball experience for players around the world.',
    15.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Adidas Soccer',
    '/images/soccer.png',
    'The Adidas soccer ball, emblematic of the brand\'s excellence in sports innovation, is a masterpiece of design and functionality. 
    Crafted for the highest levels of play, it integrates state-of-the-art materials and engineering to enhance performance, durability, and flight precision. 
    Notably featured in prestigious tournaments like the FIFA World Cup and UEFA Champions League, Adidas balls are celebrated for their superior quality, innovative 
    features like thermal bonding for seamless construction, and textured surfaces for optimal grip and control. Each edition reflects technological advancements, ensuring 
    optimal touch and trajectory. Adidas\' commitment to soccer is evident in their balls, symbolizing the fusion of tradition and innovation in the beautiful game.',
    10.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Dyson Vacuum',
    '/images/vacuum.png',
    'The Dyson vacuum cleaner is a testament to cutting-edge design and superior engineering, setting a benchmark in the cleaning technology industry. Known for its 
	powerful suction, it harnesses Dyson\'s patented cyclone technology that captures microscopic particles, including pollen and bacteria, making it an ideal choice for allergy 
	sufferers. Its ergonomic design ensures ease of use across various surfaces, from carpets to hard floors, without losing suction power. Many models are cordless, offering 
	unparalleled flexibility and convenience for seamless cleaning. The Dyson vacuum is not just a tool but a sophisticated device that combines functionality with aesthetic 
	appeal, embodying innovation in every aspect to provide a cleaner, healthier living environment.',
    200.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Cola Coke',
    '/images/coke.png',
    'Coca-Cola, often referred to as Coke, is a legendary carbonated soft drink cherished across the globe. Its signature blend of sweet syrup and unique flavorings, 
    combined with carbonated water, offers a refreshing and invigorating experience, making it a staple beverage choice for millions. The drink\'s iconic red and white 
    branding is instantly recognizable, symbolizing moments of joy and refreshment. Coca-Cola has maintained its classic taste over the years, while also introducing 
    various flavors and formulations to cater to diverse preferences. Beyond its taste, Coke has embedded itself in cultures worldwide, often associated with happiness, 
    social gatherings, and timeless advertising campaigns, continuing to captivate the hearts of people of all ages.',
    9.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Apple TV',
    '/images/tv.png',
    'Apple TV is a sleek, compact streaming device that serves as a digital hub for entertainment, bringing a wide array of content from the internet directly to your 
    television. It supports streaming services like Apple TV+, Netflix, Hulu, and more, offering access to thousands of movies, TV shows, and live sports. With its 
    intuitive interface, powered by tvOS, users can easily navigate through content and even download apps and games from the Apple TV App Store. The device features 
    high-definition and 4K resolution support, ensuring crisp and vibrant visuals. Integrated with Apple\'s ecosystem, it allows for seamless interaction with other 
    Apple devices, making streaming and sharing content across platforms a breeze. Apple TV embodies the company\'s commitment to quality, innovation, and a superior 
    user experience.',
    300.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Iphone15',
    '/images/iphone15.png',
    'The iPhone 15 and iPhone 15 Plus are smartphones designed, developed, and marketed by Apple Inc. They are the seventeenth and current generation of iPhones, succeeding 
    the iPhone 14 and iPhone 14 Plus. The devices were announced on September 12, 2023, during the Apple Event at Apple Park in Cupertino, California alongside the 
    higher-priced iPhone 15 Pro and 15 Pro Max. Pre-orders began on September 15, 2023, and the devices were made available on September 22, 2023. Like the iPhone 15 Pro and 
    Pro Max, the 15 and 15 Plus are the first iPhones to replace the proprietary Lightning connector with USB-C to comply with European Union mandates.',
    899.00
);