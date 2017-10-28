var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
var fs = require('fs');
var connect = require('connect');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var chat = require('./routes/chat');
var mongoose = require('mongoose');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use('/',express.static(path.join(__dirname, '/dist')));
app.use('/landing',express.static(path.join(__dirname, '/dist')));
app.use('/dashboard',express.static(path.join(__dirname, '/dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));

app.use('/chat', chat);
app.use(cors({credentials: true, origin: true}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.Promise = global.Promise;

/*Connect MongoDb*//*192.168.1.158*/

mongoose.connect('mongodb://localhost:27017/mean-chat',{ useMongoClient: true }).then(function (success) {
  console.log("success",success)
})
.catch(function (error) {
console.log("error",error)
});


module.exports = app;
