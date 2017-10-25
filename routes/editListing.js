var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');

router.get('/', function(req, res, next) {
    
    res.render('editListing',{
        scripts: ['editListing.js']    
        });
});

module.exports = router;