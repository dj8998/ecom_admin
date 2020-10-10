const express = require('express');
const { addItemToCart } = require('../controller/cart');
const { reqiredSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();

router.post('/user/cart/addtocart', reqiredSignin, userMiddleware, addItemToCart);

module.exports = router