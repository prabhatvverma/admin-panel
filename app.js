
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./api.yaml');



const app = express();



// app.use(bcrypt);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*------- session use ------*/
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());


//YAML LISTENING ROUTE DEFINE

app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(swaggerJsDocs));

// app.use('/', indexRouter);
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/forget', require('./routes/forgetPas'));
app.use('/admin', require('./routes/admin'));


app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/admin',
        failureRedirect: '/register'
}));

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
module.exports = app;
