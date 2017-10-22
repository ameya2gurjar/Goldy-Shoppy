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

      for(var i in product.comments){
        var t =moment(product.comments[i].comment_time).fromNow();
        product.comments[i].newTime = t;
      }
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

router.post('/comment', function(req, res){
  var userid = req.body.userid;
  var username = req.body.username;
  var userpic = req.body.userpic;
  var comment = req.body.comment;
  var time = Date.now();
  var productId = ObjectId(req.body.productId);

  req.db.collection('products').update({'_id': productId}, {$push: { comments:{comment_by: username, comment_by_id: userid, comment_by_pic: userpic, comment_content: comment, comment_time: time}}},
  function(err, results){
    console.log(results);
      res.status(200).send('success');
  });

});

module.exports = router;
