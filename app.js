//require('./models/db');
const config=require('./models/db');
let createError = require('http-errors');
let express = require('express');
let path = require('path');

const session = require('express-session');
const {check,validationResult  } = require('express-validator');
 const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
var hbs = require('hbs');

const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User=require('./models/users.model');


//routing

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let homeRouter = require('./routes/home');
let templateRouter = require('./routes/template');

//helpers


//express setting
const { if_eq,if_selected } = require('./handler/handlerlist');

var app = express();
//authentication

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));


hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('hbs', exphbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/',helpers: {
  if_eq:if_eq,if_selected:if_selected
}
}));
app.set('view engine', 'hbs');

//validator



//passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(['/','/register'], indexRouter);
app.use('/users', usersRouter);
// app.use('/register', registerRouter);
app.use('/home', homeRouter);
app.use(['/template','/template/sections','/template/subfields'], templateRouter);


//catch 404 and forward to error handler
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
