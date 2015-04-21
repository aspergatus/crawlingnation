/**
 * Created by tonynguyen on 11.12.14.
 */


var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require ('path');
var fs = require("fs");
var request = require('request');
var Iconv  = require('iconv').Iconv;



var jsonParser = bodyParser.json();
var motherIP = '54.172.128.255:6666';

setInterval(registerchild,1000 * 30);

router.get('/httpget', function(req, res) {
    var targetUrl=req.query.targeturl;
    var encoding=req.query.encoding;
    
    if(encoding==null){
        request(targetUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
                res.json({'status':res.statusCode,'body': body});
          }else{
                console.log("Got error: " + e.message);
                res.json({'status':res.statusCode,'body': null});
          }
        })
    }else{
        request({ 
        uri: targetUrl,
        method: 'GET',
        encoding: 'binary'
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = new Buffer(body, 'binary');
                conv = new Iconv(encoding, 'utf8');
                body = conv.convert(body).toString();
                res.json({'status':res.statusCode,'body': body});
            }else{
                console.log("Got error: " + e.message);
                res.json({'status':res.statusCode,'body': null});
            }
            
        });
    }
});

function registerchild(){
    var url = 'http://' + motherIP + '/api/registerchild?port=8080'  ;
    
    request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              var content = JSON.parse(body);
              console.log(content.message); 
          }else{
              console.log("Got error: " + e.message);
          }
    })
}

module.exports = router;