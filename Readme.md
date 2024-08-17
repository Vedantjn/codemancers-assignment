# Nodejs Ecommerce Application

Nodejs ecommerce application

Here are some screenshots of the application:

![Home Page](./frontend/public/screenshots/1.png)

![Login Page](./frontend/public/screenshots/2.png)

![Cart Items](./frontend/public/screenshots/3.png)

![Checkout Page](./frontend/public/screenshots/4.png)

![Order successfully placed toast](./frontend/public/screenshots/5.png)

![Received order confirmation](./frontend/public/screenshots/6.png)

![Logged in as Admin](./frontend/public/screenshots/7.png)

![Edit Product](./frontend/public/screenshots/8.png)

![Add new Product](./frontend/public/screenshots/9.png)

![New Product added](./frontend/public/screenshots/10.png)


## Introduction

This project is a full-stack eCommerce application built using Node.js, Express.js, MongoDB for the backend, and React.js for the frontend. The application includes features such as user authentication, product management, cart management, and order processing.

## Instructions

1. Clone this repository.
2. Ensure you have Node.js installed (version 14 or higher recommended).
3. Run `npm install` to install dependencies in both frontend and backend folders.
4. Frontend's .env: 
-REACT_APP_API_URL=https://codemancers-assignment-74xb.onrender.com
-Backend's .env: 
MONGO_URI=mongodb+srv://vedantjain:codemancerspasswords@cluster0.x8jbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=ankjdnkjadnfakjsdfnskdjfn
EMAIL_USER=
EMAIL_PASS=
PORT=5000
FRONTEND_URL=https://codemancers-assignment-nine.vercel.app/
5. Run `npm start` to start the backend as well as frontend.
6. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Features

- User Authentication: Sign up, log in, and log out functionality.
- Product Management: Admins can add, update, and delete products.
- Cart Management: Users can add products to their cart and manage the cart items.
- Order Processing: Users can place orders, and admins can manage orders.
- Email Notifications: Automatic email notifications for order confirmations.