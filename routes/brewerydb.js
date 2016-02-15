var express = require('express')
var router = express.Router();

require('dotenv').load();


/* API Call */
router.get('/', function(req, res, next) {
  getRequest('fermentables')
  .then(function(data){
    res.send(data)
  })
})



function getRequest(destination, page) {
  var currentPage = page || 1;
  return new Promise(function(resolve, reject) {
    unirest.get('http://api.brewerydb.com/v2/' + destination).query({
      'key': process.env.BREWERYDB_API_KEY,
      'p': currentPage
    })
    .header({'Accept': 'application/json'}, {"Access-Control-Allow-Headers": "x-requested-with, x-requested-by"})
    .end(function (response){
      console.log('ended');
      resolve(response);
    });
  })
}


function requestLoop(destination) {
  var page;
  var totalPages;
  var promiseArray = [];
  return new Promise(function(resolve, reject) {
    getRequest(destination)
    .then(function(data) {
      promiseArray.push(data);
      page = data.body.currentPage;
      totalPages = data.body.numberOfPages
      for (var i = 2; i <= totalPages; i++) {
        page = i.toString();
        promiseArray.push(getRequest(destination, page))
      }
      console.log(promiseArray);
      Promise.all(promiseArray)
      .then(function(data){
        resolve(data);
      })
    })
  })
}

module.exports = router;
