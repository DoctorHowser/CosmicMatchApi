var express = require("express");
var app = express();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose')


require('dotenv').config()
// Routes //
var index = require('./controllers/index');

// App Set //
app.set("port", (process.env.PORT || 5000));

var mongoUri = 
    process.env.MONGODB_URI;
var mongoConfig = {
    useMongoClient: true
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({expanded: true}));

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());

mongoose.Promise = global.Promise

mongoose.createConnection(mongoUri, mongoConfig).then(function(res) {
    console.log("Mongo Connection Success!")
    }).catch(function (err) {
        console.error('Connection To Mongo FAILED!')
    });


var localUserSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String
});
var FacebookUserSchema = new mongoose.Schema({
    fbId: String,
    email: { type : String , lowercase : true},
    name : String
});

var FbUsers = mongoose.model('fbs', FacebookUserSchema);
var Users = mongoose.model('userauths', localUserSchema);

// Routes
app.use('/', index);

// Mongo Connection //


// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});