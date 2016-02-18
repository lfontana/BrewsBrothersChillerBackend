var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Batches(){
  return knex('batches');
}


/* GET batches for dashboard */

router.get('/', function(req, res, next){
  console.log(req.decoded);
  res.send("req.decoded");
  // Batches().select().then(function(data){
  //   res.send(data);
  // });
})

router.post('/', function(req, res, next){
  console.log("req body", req.body);
  Batches().insert({
    user_id: req.body.user_id,
    beer_id: req.body.styleNumber,
    name: req.body.name
  }, 'id').then(function(data){
    res.end();
  });
});

module.exports = router;
