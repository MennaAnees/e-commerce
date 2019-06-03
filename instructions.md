# BotCommander Backend Hiring Test

Our mission in BotCommander is to help businesses achieve goals by integrating AI and automation solutions into the workflow without the need for any coding or technical knowledge.
The responsibility to create easy to use, intuitive, and fast solutions, required us to make everything simple and fast from the beginning, with our design and agile development process.

From BotCommander products is Ostoria.com, Ostoria is the most intelligent e-commerce platform that anyone can use to sell online, with only 3 steps, the user will have everything they need to grow and reach the next step.

This test is designed to test your ability to create backends and to put your creativity in a challenge. These instructions do not specify every single detail you should take into consideration. This is done on purpose to test your ability to analyze a problem and come up with a reasonable and safe approach. Keep in mind that your code will determine how store admin manage their products. Thoroughness is one of the most important qualities for this role.

**Goal**: Design A backend to handle products CRUD operations

 ## Requirements
Build a dockerized Node.js application to build the required app.
If you're not comfortable with Node.js, feel free to use the language of your choice.
The command `docker-compose up` **MUST**:
1- Initiate and run database, and backend.
2- Provide Graphql playground url.
3- If not using Graphql, send docs of the APIs or share your Postman collection.

Database schema:
Required fields will be marked with //r or //required

**Product**
```
id int pk
name varchar //required
slug varchar //required slug is url friendly string
image varchar //required
description varchar
regular_price varchar  //required
sale_price varchar
date_on_sale_from datetime
date_on_sale_to datetime

manage_stock boolean //default false
stock_quantity int
sku varchar //optional - unique
```

**Order**
```
id int pk
status varchar //r [pending, confirmed, shipping, completed, cancelled, refunded, failed]
currency varchar //r
customer_note varchar
store_note varchar
customer_details json //r {firstName, lastName, phoneNumber, email}
shipping_address json //r {country, city, state, addressLine}
payment_method varchar //r [COD, CREDIT]
```

**Order Item**
```
id int pk
product_id int //r -> Product.id
quantity int //r
order_id int //r -> Order.id
```

Your task is to design a backend (REST APIs or Graphql) to handle all business logic and CRUD operations of the above database scheme for a simple e-commerce site.

Although we prefer our development stack Postgres, Nodejs, and GraphQL (Appollo). You are free to use any development stack you are comfortable with.

Design the backend as you see it will be best, and make sure everything is functional, complete.
**Note** don't make more than the required, any extras will not be taking into consideration i.e. user model

**Note** You will be scored on how complete your software is, and the assumption to project from such limited information, and handeling of use cases.

## Submitting your results

Put your project in a private GitHub repo, and send us the link. Make sure the Dockerfile is on the top level.

## Recommendations
- Graphql Nodejs Boilerplate: https://github.com/graphql-boilerplates/node-graphql-server/tree/master/basic
- Graphql tutorial: https://www.howtographql.com



