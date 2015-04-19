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
    
    console.log("Getting: " + targetUrl);
    http.get(targetUrl, function(response) {
      console.log("Got response: " + response.statusCode);
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

/*
//save output
router.post('/file', jsonParser, function(req, res){
    if(req.session.user==null)
        res.json({'error':2,'message':'Benutzer nicht eingeloggt'});

    console.log("body: ",req.body);
    if (!req.body)
        return res.sendStatus(400);

    var filePath=path.join("./data", req.session.user.folder,"input",req.body.fileid+".json");
    if(fs.existsSync(filePath)){
        //check if we already have another output
        var outputPath=path.join("./data", req.session.user.folder,"input",req.body.fileid+".json");
        var content=null;
        if(fs.existsSync(outputPath)){
            content=JSON.parse(fs.readFileSync(outputPath));
        }
        if(content == null || content.number ==null){
            return res.json({'error':1,'message':'Datei nicht gefunden.'});
        }
        if(content['indikationen-codes'] ==null){
            //content['indikationen-codes']=[];
        }
        if(content['kontraindikationen-codes'] ==null){
            //content['kontraindikationen-codes']=[];
        }

        content['indikationen-codes']=req.body['indikationen-code'];
        fs.writeFile(outputPath, JSON.stringify(content, null, 3));

        res.json({'error':0,'message':'Datei gespeichert'});
    }else{
        res.json({'error':1,'message':'Datei kann nicht geschrieben werden. Keine Berechtigung.'});
    }
});
*/

module.exports = router;