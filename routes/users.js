var express = require('express');
var router = express.Router();
var moment = require('moment');

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/allRequests', function(req, res){
  // console.log(req.user._json.sub);

  req.db.collection('requests').find({'userId':req.user._json.sub}).toArray(function(err, requests){
      for(var i in requests){
        // console.log(products[i].images);
        var m =moment(requests[i].requested_at).fromNow();
        requests[i].newTime = m;
      }
      res.render('allRequests', {requests: requests, user: req.user, scripts: ['allListing.js']});
  });
});

router.get('/allListings', function(req, res){
  // console.log(req.user._json.sub);

  req.db.collection('products').find({'posted_by.id':req.user._json.sub}).toArray(function(err, products){
      for(var i in products){
        // console.log(products[i].images);
        var m =moment(products[i].posted_at).fromNow();
        products[i].newTime = m;
        products[i].dispImg =  products[i].images[0];
      }
      res.render('allListings', {products: products, user: req.user, scripts: ['allListing.js']});
  });
});

router.get('/editListing/:productId', function(req, res){
  // console.log(req.user._json.sub);
  var productId = ObjectId(req.params.productId);
  req.db.collection('products').findOne({'_id':productId}, function(err, product){
    console.log(product);
      res.render('editListing',{user: req.user, product: product, scripts: ['postListing.js']});
  });

});

router.post('/deleteRequest', function(req, res){
  console.log(req.body.id);
  var id = ObjectId(req.body.id);
  req.db.collection('requests').deleteOne({_id: id}, function(err, results){
        // console.log(results);
        //send success status to client side
        res.status(200).send('success');
    });
});


router.post('/deleteListing', function(req, res){
  console.log(req.body.id);
  var id = ObjectId(req.body.id);
  req.db.collection('products').deleteOne({_id: id}, function(err, results){
        // console.log(results);
        //send success status to client side
        res.status(200).send('success');
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
