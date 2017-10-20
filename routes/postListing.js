var express = require('express');
var router = express.Router();
// add co lib to chain promises
var co = require('co');

var mongodb = require('mongodb');

// add multer lib to support file uploads
var multer  = require('multer')
var multerGridFs = require('multer-gridfs-storage');

// use this for sending files to browser from gridfs
var Gridfs = require('gridfs-stream');

// to store in memory:
// var upload = multer({ storage: multer.memoryStorage() })

// to store in mongodb (GridFS):
const multerGridFsStorage = multerGridFs({
   url: process.env.DB_URI
});
var upload = multer({ storage: multerGridFsStorage });


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.user);
  res.render('postListing', {
    user: req.user
  });
});

router.post('/newListing', upload.single('thefile'), function(req, res){
  if (!req.file) {
    res.status(500).send('error: no file');
  }
  console.log(req.file);

  /*
  req.file:
    upload-file-form { fieldname: 'thefile',
    originalname: 'upload-me.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: 'uploads/',
    filename: '4e5b95869729cf62b4db9005fe9ce575',
    path: 'uploads/4e5b95869729cf62b4db9005fe9ce575',
    size: 30 }
  */

  // res.json({
  //   'filename': req.file.originalname,
  //   'mimetype': req.file.mimetype,
  //   'size (bytes)': req.file.size
  // });

  var product = Object();
  product.name = req.body.name;
  product.description = req.body.description;
  product.type = req.body.type;
  product.price = req.body.price;
  product.fileId = req.file.id;

  req.db.collection('products').insertOne(product, function(err, results){
      res.send("Done")
  })
  console.log(product);
});

module.exports = router;
