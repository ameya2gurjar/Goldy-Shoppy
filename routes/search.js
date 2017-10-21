var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');

router.get('/', function(req, res, next) {
    var sitem=req.query.sitem;    
    var category=req.query.category;
    var sortBy=req.query.SortBy;

    if(sortBy=='priceA')
         sortBy={ price : 1 };
    else if(sortBy=='priceD')
         sortBy={ price : -1 };
    else if(sortBy=='Date-PostedA')
         sortBy={ posted_at : 1 };
    else
        sortBy={ posted_at : -1 };
    
    
    var searchBy;
    
    if(!!!sitem){
        searchBy =  {category:category};
    }else{
        if(category=="All"){
            searchBy = { $text: { $search: sitem  } };
        }
        else{
            searchBy= {$and: [{ $text: { $search: sitem  } },{category:category} ] };
        }
    }
    
    req.db.collection("products").find(searchBy).sort(sortBy).toArray(function(err, result){
            sendData(result);
    });
    
    function sendData(result){
        var utcMilliSeconds;
        var d = new Date(0);
        for(var i in result){
            if(!!result[i].images)
            result[i].img = result[i].images[0];
        }
        
        for(var i in result){
            if(!!result[i].posted_at)
                {
                    utcMilliSeconds = parseInt(result[i].posted_at);
                    console.log(utcMilliSeconds);
                    result[i].posted_at = (String)(d.setUTCMilliseconds(utcMilliSeconds));
                    console.log(result[i].posted_at);
                } 
        }
//        console.log(utcMilliSeconds);
        
//        console.log(result);
//        console.log(result.posted_at);
//    console.log(result.images);
        res.render('search',{
        user: req.user,
        result: result,
        sitem: sitem    
        });   
    }
});

module.exports = router;


