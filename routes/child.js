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
var Browser =  require('zombie');



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

router.get('/uidget',function(req,res){
    var uid = req.query.uid;
    var startTime = new Date();
    
    var browser = new Browser();
    browser.visit('https://www.uid.admin.ch/Detail.aspx?uid_id=' + uid, function() {
        try{
            if(browser.query('#txtName') != null && browser.query('#txtName').value.length > 0 ){
                var content = {
                    uid: uid,
                    name: browser.query('#txtName').value,
                    translation: browser.query('#txtHRTranslation').value,
                    street: browser.query('#txtStreet').value,
                    number: browser.query('#txtNumber').value,
                    postcode: browser.query('#txtPostCode').value,
                    location: browser.query('#txtLocation').value,
                    canton: browser.query('#cbxCanton_readonly').childNodes[1].innerHTML,
                    HRNumber: browser.query('#txtHRNumber').value
                };
                //console.log(content);

                var nowTime = new Date();
                if(nowTime - startTime > 1000){
                    res.json({'status':200,'content': content});
                }else{
                    setTimeout(function(){
                        res.json({'status':200,'content': content});
                    },1000 - (nowTime - startTime));
                }
                
            }else{
                res.json({'status':400,'content': null});
            }
        }catch(ex){
            console.log(ex);
            res.json({'status':400,'content': null, 'message': ex});
        }
    })
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