Documentation for this project:

1. Goals

The goals of this project is in the 'proposal.md', the link is below:

https://github.com/nuwebdev/hw05-proposal-doushenyiyezhiqiu/blob/main/proposal/proposal.md

2. Plan

The plan of this project is in the 'plan.md', the link is below:

https://github.com/nuwebdev/hw05-proposal-doushenyiyezhiqiu/blob/main/proposal/plan.md

3. Design decisions

The goals of this project is in the 'proposal.md', the link is below:

https://github.com/nuwebdev/hw05-proposal-doushenyiyezhiqiu/blob/main/proposal/proposal.md

4. Accomplishments

I have completed all the objectives and design requirements outlined in the 'proposal.md'. The project involves a comprehensive ecommerce website utilizing ReactJS for the frontend, Flask for the backend, and MySQL for the database. I integrated Auth0 by Okta for user authentication and Stripe for processing payments. This setup allows customers to explore and buy products, track their order history, and use a search bar to find products.

However, in terms of the 'plan.md', while I met all targets, I did not adhere to the timeline. During the course presentation that was intended to showcase my application prototype, I only managed to present the initial version (V0.1) of my app, despite plans to have the second version (v0.2) ready by that time.

5. User guidelines

To access the full features of this website, customers must first log in by clicking the 'login' button located at the top right of the navigation bar. Without logging in, customers are limited to browsing the product list without accessing detailed product information or using functions like 'add to cart' or 'order history'. To log in, a new page will open where new users need to register by providing an email and setting a password, or they can log in using a Google account. Returning users can simply log in with their existing email and password.

Once logged in, customers have full access to all product details and the complete navigation bar. They can search for products by typing in the search field at the center of the navigation bar and either pressing the 'enter' key or clicking the 'search' button. Products can be added to the cart, and the details can be viewed by clicking the 'cart' icon. On the cart details page, products can be added or removed. To proceed with the purchase, customers can click the 'checkout' button. During checkout, they will need to enter their first names, last names, emails, shipping and billing addresses, and select a payment method. It is important to use the same email address for order history tracking as used for logging in.

6. Lessons learned

I completed all the initial objectives set out for my project, but I did not meet the expected timeline for the course's prototype presentation. Instead of completing the first two versions as planned, I only managed to complete the initial version (v0.1).

In selecting the appropriate technologies, I opted for ReactJS for the frontend and Flask for the backend, both of which were covered in the class and are straightforward to implement. I chose MySQL as the database because this project involves managing numerous objects with similar attributes, making a relational database suitable. Among relational databases, MySQL is my most familiar choice and can handle large amounts of data, unlike SQLite, which is more lightweight. For third-party authorization, I implemented Auth0 by Okta, which offers a user-friendly interface and an easy-to-use API. Additionally, I integrated Stripe for handling payments, a popular choice among developers.

I believe I effectively scoped my project in both the 'proposal.md' and 'plan.md', including the addition of the Stripe API, which was not initially mentioned in the proposal.

The most engaging aspect of my project lies in the integration of the two APIs, Auth0 and Stripe. Using Stripe's dashboard, I can monitor successful payments and process refunds if necessary. These APIs are not only simple to implement but also significantly enhance development efficiency.

The biggest challenge I faced was time. With only three weeks to complete the full stack application on my own, it required careful planning and leveraging my prior experience. Thankfully, this experience enabled me to meet all project requirements successfully.

I believe there are several areas in this project that could benefit from improvements. For instance, the images and descriptions are currently hard-coded into the local database, and the system only supports a customer role. These aspects could be enhanced in future updates.

7, References

I wrote all the code myself, starting with the default React template for the project structure.

The product descriptions come from various sources; some are crafted by ChatGPT, while others, such as the description for the iPhone 15, are sourced from Wikipedia, available at:

https://en.wikipedia.org/wiki/IPhone_15

Many of the images used are from Google Images. Since this content isn't a primary focus, I've chosen not to detail these images. For understanding and implementing the APIs, I consulted the official documentation for Auth0 and Stripe, which can be accessed through the following links:

https://auth0.com/docs/quickstarts

https://docs.stripe.com/payments/online-payments

