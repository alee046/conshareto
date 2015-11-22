var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var passport      = require('passport');

// load the env variables
require('dotenv').load();


// connect to the MongoDB with mongoose
require('./config/database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('ejs').delimiter = '$';

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// mount passport
app.use(passport.initialize());
app.use(passport.session());

// you can now write css in scss files!
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
require('./config/passport')(passport);

// index mounts all routes
require('./routes/index')(app);

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Thanks for the request, but I can`t find it.');
});

module.exports = app;
