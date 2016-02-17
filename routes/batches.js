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
  });
  res.send(sampleData);
})

router.post('/', function(req, res){
  Batches().insert({
    user_id: req.body.user_id,
    beer_id: req.body.styleNumber,
    name: req.body.name
  });
});

var sampleData = [
  {
    name: "Pale Ale - Default",
    style: "pale ale",
    created: 1454673600,
    lastRun: 1454846400,
    favorite: false,
    schedule: [
      {
        time: 0,
        temp: 68
      },
      {
        time: 86400,
        temp: 65
      },
      {
        time: 604800,
        temp: 50
      }
    ]
  }

]

module.exports = router;
