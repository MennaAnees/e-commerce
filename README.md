# e-commerce
e-commerce platform developed by NodeJs and MySQL 

# instructions:

- 'docker-compose up':
    1-run database
    2-run seed script to insert 2 users
    3-run server

- API documentation:

1- product crud operations
    -add : '/product'
    -edit: '/product/productId'
    -delete: '/product/productId'
    -list: '/product'

2- user cart:
    -add product to cart: '/user/userId/cart'
    -edit cart count: '/user/userId/cart/cartId'
    -remove cart of the user: '/user/userId/cart' 

3-order:
    -user create order: '/order/userId'
    -change order status: '/order/orderId/status'  
