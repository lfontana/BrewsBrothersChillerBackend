var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Batches(){
  return knex('batches');
}


/* GET batches for dashboard */

router.get('/', function(req, res, next){
  Batches().select().then(function(data){
    console.log("data ", data);
    res.send(data);
  });
})

router.post('/', function(req, res){
  Batches().insert({
    user_id: req.body.user_id,
    beer_id: req.body.styleNumber,
    name: req.body.name
  });
});

module.exports = router;
