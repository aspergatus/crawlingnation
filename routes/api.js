/**
 * Created by tonynguyen on 11.12.14.
 */


var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require ('path');
var fs = require("fs");
var http = require('http');



var jsonParser = bodyParser.json();

//get file content
router.get('/httpget', function(req, res) {
    var targetUrl=req.query.targeturl;
    
    http.get(targetUrl, function(response) {
      var bodyarr = [];

      response.on('data', function(chunk){
        bodyarr.push(chunk);
      });
      response.on('end', function(){
        res.json({'status':res.statusCode,'body': bodyarr.join('').toString()});
      });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        res.json({'status':res.statusCode,'body': null});
    });
});

module.exports = router;