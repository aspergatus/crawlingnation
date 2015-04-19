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
var motherIP = '54.172.128.255:6666';

setInterval(registerchild,1000);

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

function registerchild(){
    var url = 'http://' + motherIP + '/api/registerchild?port=8080'  ;
    http.get(url, function(response) {
      var bodyarr = [];

      response.on('data', function(chunk){
        bodyarr.push(chunk);
      });
      response.on('end', function(){
        var content = JSON.parse(bodyarr.join('').toString());
        console.log(content.message);
      });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

module.exports = router;