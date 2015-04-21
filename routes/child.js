/**
 * Created by tonynguyen on 11.12.14.
 */


var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require ('path');
var fs = require("fs");
var http = require('http');
var https = require('https');
var url = require('url');



var jsonParser = bodyParser.json();
var motherIP = '54.172.128.255:6666';

setInterval(registerchild,1000 * 30);

router.get('/httpget', function(req, res) {
    var targetUrl=req.query.targeturl;
    
    var httpModule = http;
    var urlObj = url.parse(urlStr);
    if(urlObj.protocol == 'https')
        httpModule = https;

    
    httpModule.get(targetUrl, function(response) {
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