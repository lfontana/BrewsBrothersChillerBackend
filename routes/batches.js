require('dotenv').load();

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('mongodb');
var promise = require('bluebird')

function Batches(){
  return knex('batches');
}

function Users(){
  return knex('users');
}


/* GET batches for dashboard */



router.get('/', function(req, res, next){
  Batches().where('user_id', req.user.id).select().then(function(batches) {
    return promise.map(batches, function(batch) {
      var batchId = batch.id;
      return new Promise(function(res, rej){
        db.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
        var brews = db.collection('brews');
        // console.log(batch);
         brews.find({
          brew_id:batchId
        }).limit(1).next(function(err, data){
          batch.schedule = data.schedule;
          res(batch)
          })
        })
      });
    })
  }).then(function(batches) {
    res.send(batches);
  })
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

router.get('/startBrew', function(req, res, next){
  if(req.user.pi_id){

  }else{
    res.send('need a pi ip address');
  }

})
module.exports = router;
