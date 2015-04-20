

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require ('path');
var fs = require("fs");
var http = require('http');



var jsonParser = bodyParser.json();

var childrenlist = {};
setInterval(refreshChildren,1000 * 60);

router.get('/registerchild', function(req, res) {
    var port = req.query.port;
    var ip = req.ip;
    
    childrenlist[ip] = {port: port, lastupdate: Math.floor(new Date() / 1000)};
    
    return res.json({error:0, message: 'Mother: ok'});
});

router.get('/getchildren', function(req, res) {
    return res.json({error:0, message: 'ok', children: childrenlist});
});
                     
function refreshChildren(){
    Object.keys(childrenlist).forEach(function(key){
        if(Math.floor(new Date() / 1000) - childrenlist[key].lastupdate > 60)
            delete childrenlist[key];
    });
}

module.exports = router;