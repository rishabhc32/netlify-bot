var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var debug = require('debug')('app:wrongClient');

var buildStatusRouter = require('./routes/netlify_build');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.use('/netlify_build', buildStatusRouter);

app.use(function(req, res, next) {
    if(res.locals.wrongClient) {
        debug(`${req.hostname} ${req.method} ${req.originalUrl} ${req.ips}`)
    }
    
    next(createError(404));
});

app.use(function(err, req, res, next) {
    //res.status(err.status || 500);
    res.sendStatus(err.status);
});

module.exports = app;
