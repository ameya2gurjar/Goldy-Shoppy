var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

router.get('/:productId', function(req, res, next) {
  // console.log(req.params.productId);
  var productId = ObjectId(req.params.productId);
  req.db.collection('products').findOne({'_id':productId}, function(err, product){
    console.log(product);
    if(product){
      req.db.collection('users').findOne({'_id':product.posted_by}, function(err, posted_by){
        res.render('product', {
          user: req.user,
          product: product,
          posted_by: posted_by,
          scripts: ['local.js']
        });
      });
    }else{
      res.render('error');
    }
  });
});

module.exports = router;
