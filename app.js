var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/NNPTUD-C2');
mongoose.connection.on('connected', () => {
  console.log("connected");
})

// Trang chủ: hướng dẫn dùng API
app.get('/', function (req, res) {
  res.json({
    message: 'NNPTUD-C2 API',
    docs: 'Dùng các endpoint dưới /api/v1/',
    endpoints: {
      auth: '/api/v1/auth (register, login, me, logout, change-password)',
      users: '/api/v1/users',
      roles: '/api/v1/roles',
      products: '/api/v1/products',
      categories: '/api/v1/categories'
    }
  });
});

app.use('/api/v1/', require('./routes/index'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/roles', require('./routes/roles'));
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/auth', require('./routes/auth'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler (API: trả JSON, không dùng view)
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    ...(req.app.get('env') === 'development' && { error: err })
  });
});

module.exports = app;
