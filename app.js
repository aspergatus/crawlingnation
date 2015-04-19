

var express = require('express');
var routes = require('./routes/index');
var api = require('./routes/api');
var http = require('http');
var path = require ('path');
var logger = require('morgan');

var app = express();

app.set('port',3000);
app.use(logger('dev'));


//app.use(express.static(path.join(__dirname,'public')));
app.use('/api', api);

var httpServer = http.createServer(app);

httpServer.listen(8080);
