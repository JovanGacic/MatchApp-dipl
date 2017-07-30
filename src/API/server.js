//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/rest_test');

//Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Routes
app.use('api', require('./routes/api'));

//Start server
app.listen(3000);
console.log('API on port 3000');