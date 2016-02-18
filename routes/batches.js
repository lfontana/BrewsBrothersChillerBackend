require('dotenv').load();

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('mongodb');


function Batches(){
  return knex('batches');
}


/* GET batches for dashboard */

router.get('/', function(req, res, next){
  Batches().select().where('user_id', rec.decoded.id).then(function(data) {
    db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
      var brews = db.collection('brews');
      brews.find({
        brew_id:data[0],
        schedule: req.body.schedule
      }, function(){
        res.send(data);
      })
    });
  };
})

router.post('/', function(req, res, next){
  Batches().insert({
    user_id: req.body.user_id,
    beer_id: req.body.styleNumber,
    name: req.body.name
  }, 'id').then(function(data){
    console.log(data);
    db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
      var brews = db.collection('brews');
      brews.insert({
        brew_id:data[0],
        schedule: req.body.schedule
      }, function(){
        res.send("success");
      })
    });
  });
});

router.delete('/', function(req, res, next){
  Batches().where('id', req.body.id).del()
  .then(function(){
    res.end();
  })
})

module.exports = router;
