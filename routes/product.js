var express = require('express');
var router = express.Router();
var moment = require('moment');

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

router.get('/:productId', function(req, res, next) {
  // console.log(req.params.productId);
  var productId = ObjectId(req.params.productId);
  req.db.collection('products').findOne({'_id':productId}, function(err, product){
    console.log(product);
    if(product){
      var m =moment(product.posted_at).fromNow();
      product.newTime = m;
        res.render('product', {
          user: req.user,
          product: product,
          scripts: ['local.js']
        });
    }else{
      res.render('error');
    }
  });
});

module.exports = router;
