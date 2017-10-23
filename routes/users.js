var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/allListings', function(req, res){
  // console.log(req.user._json.sub);

  req.db.collection('products').find({'posted_by':req.user._json.sub}).toArray(function(err, products){
      for(var i in products){
        // console.log(products[i].images);
        products[i].dispImg =  products[i].images[0];
      }
      res.render('allListings', {products: products, user: req.user});
  });
});

router.get('/editListing/:productId', function(req, res){
  // console.log(req.user._json.sub);
  var productId = ObjectId(req.params.productId);
  req.db.collection('products').findOne({'_id':productId}, function(err, product){
    console.log(product);
      res.render('editListing',{user: req.user, product: product});
  });

});

router.get('/editProfile', function(req, res){
  // console.log(req.user._json.sub);
      req.db.collection('users').findOne({'_id': req.user._json.sub}, function(err, result){
      res.render('editProfile', {user: req.user,  result:result, scripts:['profile.js']});
    });
  });

router.post('/editProfile', function(req, res){
    // console.log(req.user._json.sub);
console.log(req.body);
        req.db.collection('users').updateOne({_id:req.user._json.sub}, {$set:{displayName:req.body.displayName,
           email:req.body.email, contactNumber:req.body.contactNumber}}, function(err, result){
             console.log(result);
        res.send('cool');
      });

    });

module.exports = router;
