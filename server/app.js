var express = require("express");
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session')


require('dotenv').config()
// Routes //
var index = require('./controllers/index');
var userRouter = require('./routes/userRouter')

// App Set //
let port= process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({expanded: true}));

// Routes
app.use('/user', userRouter)
app.use('/', index);


// Listen //
app.listen(port, function(){
   console.log("Listening on port: " + port);
});