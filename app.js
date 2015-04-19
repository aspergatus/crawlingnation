

var express = require('express');
var routes = require('./routes/index');
var mother = require('./routes/mother');
var child = require('./routes/child');
var http = require('http');
var path = require ('path');
var logger = require('morgan');


//the mother
var app2 = express();
app2.use(logger('dev'));
app2.use('/api', mother);

var httpServer = http.createServer(app2);
httpServer.listen(6666);

//the child
var app = express();
app.use(logger('dev'));
app.use('/api', child);

var httpServer = http.createServer(app);
httpServer.listen(8080);


