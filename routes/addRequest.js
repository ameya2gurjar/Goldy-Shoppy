var express = require('express');
var router = express.Router();


router.post('/', function(req, res){

      console.log(req.body);

      var request = Object();
      request.name = req.body.name;
      request.category = req.body.category;
      request.requirement = req.body.requirement;
      request.message = req.body.requestMessage;
      //time if possible

      req.db.collection('requests').insertOne(request, function(err, results){
          res.send("Done")
      })

    });

module.exports = router;
