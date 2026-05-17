const express= require('express');
const router= express.Router();

const {getProduct}= require('./controllers/product.controller.js')

router.get('/',getProduct);


module.exports= router;