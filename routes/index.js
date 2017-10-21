var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.collection('requests').find().toArray(function(err, requests){
    console.log(requests);
    req.db.collection('products').find({"category":"Apartment"}).sort({"posted_at" : -1}).limit(4).toArray(function(err, apartments){
      console.log(apartments);
      //     req.db.collection('products').find({"category":"Apartment"}).toArray(function(err, appartments){
      //
      // }
      res.render('index', { title: 'Go Goldy!', user: req.user, request :requests, apartment : apartments});
    });
  });
});

module.exports = router;
