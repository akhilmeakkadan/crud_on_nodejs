const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');

const Route = express.Router();
const IndexController = require('../controllers/IndexController');
const Auth = require('../middleware/Auth');

Route.use(Auth.validate);
Route.use(express.urlencoded());//to Get post data from form.

Route.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
Route.use(flash());

Route.get('/',IndexController.index);
Route.get('/create-product',IndexController.create_product);

Route.post('/create-product-request',IndexController.create_product_request);
Route.get('/delete-product/:productId',IndexController.delete_product);
Route.get('/edit-product/:productId',IndexController.edit_product);
Route.post('/edit-product-request',IndexController.edit_product_request);
module.exports = Route;
