var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var tagsRouter = require('./routes/tags');
var mediasRouter = require('./routes/medias');

const {localAuthStrategy} = require("./routes/strategies/local")
const {jwtAuthStrategy} = require("./routes/strategies/jwt")


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize auth strategies config
localAuthStrategy;
jwtAuthStrategy

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/tags', tagsRouter);
app.use('/medias', mediasRouter);

module.exports = app;
