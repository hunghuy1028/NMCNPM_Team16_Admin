var createError = require('http-errors');
var session = require('express-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('./data/db');

var passport = require('passport');
var flash = require('connect-flash');
var adminRouter = require('./routes/admin');
var saleRouter = require('./routes/sale');
var showtimeRouter = require('./routes/showtime');
var reportRouter = require('./routes/report');
var staffRouter = require('./routes/staffaccount');
var movieRouter = require('./routes/movie');
var app = express();

require('./data/passport')(passport)
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'justasecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
adminRouter(app, passport);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/sales', saleRouter);
app.use('/showtimes', showtimeRouter);
app.use('/reports', reportRouter);
app.use('/staff', staffRouter);
app.use('/movie', movieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
