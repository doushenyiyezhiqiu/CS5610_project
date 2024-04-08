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

INSERT INTO products (name, image_url, description, price)
VALUES (
    'COCO MADEMOISELLE Eau de Parfum',
    '/images/perfume.png',
    'COCO MADEMOISELLE Eau de Parfum by CHANEL, available at Sephora, is a fragrance that embodies the spirit of the modern, independent woman. It opens with a fresh and 
    vibrant burst of orange, closely followed by a clear and sensual heart of jasmine and rose, encapsulating a daring contrast of scents. The base notes are subtly grounded 
    with patchouli and vetiver, adding depth and longevity to the fragrance. This scent is designed to linger, leaving a trail of allure and sophistication. Its packaging, 
    reflective of CHANEL\'s iconic elegance, houses the perfume in a sleek, minimalist bottle that speaks to the luxury and quality of the brand. COCO MADEMOISELLE is a 
    testament to the confidence and grace of the women who choose it.',
    120.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Slattum',
    '/images/bed.png',
    'The SLATTUM upholstered bed frame, in Knisa light gray and twin size, is a stylish and practical addition to any bedroom, courtesy of IKEA. It features a soft, padded 
    headboard that provides comfortable support for reading or relaxing in bed, making it not just a piece of furniture but a cozy retreat. The clean, simple lines and the 
    light gray upholstery lend a modern and unassuming elegance that can complement a wide range of bedroom decors. Its sturdy construction ensures durability while maintaining 
    a sleek profile. The SLATTUM is designed for easy assembly and is equipped with a slatted bed base, eliminating the need for a box spring. This bed frame embodies IKEA’s 
    commitment to functionality, quality, and contemporary design, offering a comfortable sleeping solution that doesn\'t compromise on style.',
    149.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Eletric Lift Table',
    '/images/table.png',
    'An electric lift table is a versatile and efficient piece of equipment designed to adjust the height of work materials and loads with the simple push of a button. 
    Powered by electric motors, these tables offer smooth and precise elevation control, making them ideal for a wide range of industrial, warehouse, and office settings. 
    They are especially valuable in applications requiring frequent adjustments to the height of heavy items, as they minimize physical strain and enhance ergonomic work 
    conditions. Electric lift tables come in various load capacities and sizes, catering to different operational needs. Their sturdy construction and reliability reduce 
    manual labor and increase productivity, providing a seamless solution for lifting and handling tasks. With safety features like overload protection and anti-pinch guards, 
    they are engineered not just for efficiency but also for the well-being of users, making them an essential tool in modern workplaces.',
    680.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Candle Warmer',
    '/images/candleWarmer.png',
    'The Candle Warmer Lamp is an elegant and innovative solution for those who love the ambiance of scented candles without the need for an open flame. This electric candle 
    lamp warmer, perfect as a Valentine\'s Day gift or a thoughtful present for moms, grandmas, women, and girls, features a sleek, black design that complements any decor. 
    It is specifically designed to be compatible with various candle jars, gently warming them to release their fragrance. The dimmable feature allows you to adjust the 
    intensity of the light, creating the perfect mood while also melting the wax efficiently. This wax warmer serves as both a functional and decorative piece, enhancing 
    the aroma of your space safely without soot or smoke. Its convenience and safety make it an excellent choice for homes, offices, and spa settings, offering a cozy and 
    inviting atmosphere.',
    23.39
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Resistance:Avalon',
    '/images/avalon.png',
    'Avalon is a compelling and strategic board game that immerses players in the legendary world of King Arthur and his Knights. It\'s a game of deceit, deduction, and 
    diplomacy, designed for 5 to 10 players. In Avalon, players are secretly assigned roles as either loyal servants of Arthur fighting for goodness or as minions of 
    the malevolent Mordred. The game\'s objective is for the good side to successfully complete a series of quests, while the evil side works covertly to sabotage these 
    efforts. Communication and psychology play crucial roles as players discuss, accuse, and try to uncover the true allegiances of their fellow participants. Avalon tests 
    friendships, sharpens critical thinking, and challenges players\' ability to bluff and strategize, making each game session unique and thrilling.',
    24.99
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Birthday Card',
    '/images/birthdayCard.png',
    'The American Greetings Birthday Card for Her, featuring a "Floral Happy Birthday" design, is a beautifully crafted greeting card that combines elegance with a personal 
    touch. This card showcases a vibrant and detailed floral artwork on the cover, symbolizing growth, beauty, and the blossoming of another year of life. The inside of the 
    card contains heartfelt wishes and a warm message, celebrating the special day of a woman in your life, whether she\'s a friend, family member, or loved one. 
    The high-quality paper and exquisite printing enhance the card\'s luxurious feel, making it not just a message, but a keepsake. It\'s an expression of affection and 
    thoughtfulness, designed to make the recipient feel cherished and appreciated on her birthday.',
    5.78
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Head&Shoulders Shampoo',
    '/images/shampoo.png',
    'Head & Shoulders Classic Clean Shampoo, available in an 8.45 fl oz bottle, is a daily shampoo that promises to deliver a classic, clean feel to your hair and scalp. 
    It\'s formulated to tackle dandruff, thanks to its active ingredient, pyrithione zinc, which effectively reduces flakiness, itchiness, and irritation associated with 
    dandruff. This shampoo is designed for all hair types, providing a gentle yet thorough cleaning that removes oil and flakes while maintaining scalp health and 
    hair\'s natural moisture balance. The Classic Clean variant leaves your hair smelling fresh and looking shiny, without any heavy residues. It\'s a dermatologist-recommended 
    brand known for its reliable performance in promoting a healthy scalp and beautiful hair, making it a staple in daily hair care routines for individuals battling dandruff.',
    7.99
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Mouse Pad',
    '/images/mousePad.png',
    'The Logitech Mouse Pad - Studio Series in Graphite is a sleek and stylish accessory designed to enhance your computing experience. Crafted with a smooth surface, 
    it ensures precise mouse movement and improved cursor accuracy, making it perfect for both everyday tasks and gaming. The graphite color lends a modern and sophisticated 
    look, seamlessly integrating with any desk setup. Its durable construction includes a non-slip rubber base, which keeps the pad firmly in place during use, preventing 
    slippage and providing stability. The mouse pad is optimized for all mouse sensitivities and sensors, offering a consistent and reliable surface for your mouse to 
    glide over. Compact and lightweight, this Logitech mouse pad combines functionality with design, making it an essential addition to your workspace.',
    10.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Medley Rio Sofa',
    '/images/sofa.png',
    'The Medley Rio Sofa stands at the intersection of modern design and environmental stewardship, embodying Medley\'s commitment to eco-friendly and sustainable furniture. 
    This piece is crafted with a focus on organic and customizable options, allowing for a personal touch in every home. The frame is made from sustainably sourced wood, 
    supporting both durability and eco-consciousness. For upholstery, customers can choose from a variety of organic fabrics, each free from harmful chemicals and dyes, 
    ensuring a safe and natural environment in your living space. The cushions are filled with natural latex, offering comfort without compromising on sustainability. 
    The Rio Sofa is not just a piece of furniture; it\'s a statement of care for the planet and a step towards a healthier home, providing comfort, style, and peace of 
    mind with its environmentally friendly materials and customizable options.',
    799.00
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Everything Velvet Pillow',
    '/images/pillow.png',
    'The Everywhere Velvet Pillow is a luxurious home accessory that elevates any space with its sumptuous texture and rich aesthetic. Crafted from high-quality velvet, 
    it offers an irresistible softness and a subtle sheen that catches the light, adding depth and sophistication to your decor. Its versatile design makes it suitable 
    for every room, whether it\'s adding an extra touch of elegance to your living room sofa, creating a cozy nook in your reading corner, or bringing a pop of color 
    and comfort to your bedroom. The pillow is generously filled, providing excellent support and comfort, making it not just a decorative piece but also a functional 
    addition to your home. Available in a variety of colors, the Everywhere Velvet Pillow allows for personalization of your space, matching any style or mood. 
    Its durability ensures it can be enjoyed in everyday living, making it a cherished part of your home\'s ambiance.',
    49.50
);

INSERT INTO products (name, image_url, description, price)
VALUES (
    'Man Wallet',
    '/images/wallet.png',
    'The Access Denied Slim Leather Bifold Wallet for Men epitomizes minimalist elegance and functional design, catering to the modern man\'s need for a sleek, efficient 
    \wallet. Crafted from high-quality genuine leather, it offers a luxurious feel and enduring durability. This wallet is thoughtfully designed with a slim profile to 
    fit comfortably in your pocket, eliminating bulkiness. It features multiple card slots and a bill compartment, efficiently organizing your essentials while maintaining 
    a slim silhouette. Enhanced with RFID-blocking technology, it safeguards your personal information stored on chips in credit cards and IDs against unauthorized scans, 
    providing peace of mind in an increasingly digital world. The wallet combines practicality with style, making it an ideal accessory for the discerning gentleman seeking 
    both security and sophistication.',
    29.95
);










