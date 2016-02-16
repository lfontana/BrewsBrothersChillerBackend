var express = require('express');
var router = express.Router();

/* GET batches for dashboard */

router.get('/', function(req, res, next){
  res.send(sampleData)
})

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
