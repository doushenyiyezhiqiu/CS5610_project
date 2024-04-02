# hw-proposal

Note: About how to run this project, just jump to the sixth point "Instruction on how to run this project"!

 CS5610 Web Development 
Project
1.	Team
Team number(s): Liangshe Li

Team Leader: Liangshe Li

2.	Project Goal

Shopping website: A full stack web application where customers can browse and purchase goods.

3.	User Stories

As a frequent online shopper, I want to easily browse through a wide range of products on the shopping website so that I can find items that meet my needs and preferences. I expect to filter my search by categories such as apparel, electronics, and home goods, and sort products by price, popularity, and reviews. Once I find a product that I like, I want to view detailed information about it, including high-quality images, product specifications, customer reviews, and related items. After selecting the products I wish to purchase, I want to be able to add them to my shopping cart seamlessly. I should have the option to review my cart, make any last-minute changes (such as quantity adjustments or removing items), and proceed to checkout when I am ready. During checkout, I want a straightforward process where I can enter my shipping information, choose from multiple secure payment options, and receive a clear confirmation of my order with an estimated delivery date. Post-purchase, I expect to track my order's status through the website or receive timely updates via email.

4.	UI Design

Overall Structure: We will have four pages (including dynamic html), first we will have login page. After logging in, we will see the main page which lists goods we have on this page. On the top of this page we will have a menu bar. We can click on details button to go to the product detail page. We will also have “add to cart” button and customers can add product they like to shopping carts. We will also have checkout button on the right of the menu bar.
Menu bar(in the home page): In this part we will have a logo icon, a search input text and a search button. We will also have shopping carts button so that customers can easily review their carts and we will have order history button so that customer can view their order history. We will also have checkout button so that customer can check out.
Details page: In this page we will see description and reviews of one single item.

5.	Architecture and technical requirements

For this project I would like to design a full stack web application. I will use MySQL to process data. I will not have log in authentication and we will store customer’s information in the database. I will use restful API to configure routes. We will not use a web-accessible API and we will use MySQL to deal with all data. For technologies used in this project:

Frontend: ReactJS

Backend: Flask

Database: MySQL 

6. Instruction on how to run this project

First you should make sure that your system has the environment of python3 and node. Make sure you have installed flask and MySQL (I recommend using MySQL Workbench and I will use MySQL Workbench as example to show how to run this app).

First go to the current repository. You need to create database of this app. Open MySQL Workbench, open 'dababase/create.sql' and run this script, you should create a database called "my-ecommerce".

And then open the .py file "backend/app/__init__.py", change the line9 
" app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'mysql+pymysql://root:scb78377837@localhost/my-ecommerce')"
to 
"app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'mysql+pymysql://root:defaultpassword@localhost/my-ecommerce') ",
replace "defaultpassword" with the password of your account in local MySQL.

And then go to "backend/" repository, run "python run.py" in the terminal, and then go to "frontend/my-ecommerce-website/" repository, run "npm start" in the terminal, it should open a new page in your default browser.

