const Product = require('../models/product') 

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
        }); 
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products)=>{
        res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
        }); 
    });
};

exports.getCart = (req,res,next) =>{
  res.render('shop/cart',{
    pageTitle:'Your cart',
    path:'/cart'
  })
}

exports.getCheckout = (req,res,next) =>{
  res.render('shop/checkout',{
    pageTitle:'Your cart',
    path:'/checkout'
  })
}