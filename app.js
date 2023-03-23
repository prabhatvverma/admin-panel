var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const bcrypt = require('bcrypt'); //importing bcrypt package

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register');
const resetPassRouter = require('./routes/forgetPas');
const changePassRouter = require('./routes/changepass');
const adminPanelRouter = require('./routes/admin');
const usrDetTblRouter = require('./routes/userstable');
var app = express();
// app.use(bcrypt);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
//app.use('/store', registerRouter);
app.use('/forget', resetPassRouter);
app.use('/changepass', changePassRouter);
app.use('/admin', adminPanelRouter);
app.use('/users', usrDetTblRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, () => {
  console.log("server running");
})

module.exports = app;
