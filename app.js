var express=require('express');
var bodyparser= require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require ('express-session');
var dotenv= require ('dotenv');




var mongoose=require('./db/config');
var router=require('./controller/router');


dotenv.config({path:'./config.env'});
dotenv.config();



var app=express();

app.set('view engine', 'ejs'); 
app.use(express.static('views'));

app.use(express.static(path.join(__dirname, './upload')));


//---------------- functionality-----------

app.use(cookieParser());
app.use(session({
    key: "user_sid",
    secret: "somerandomstuff",
    resave: false,
    saveUninitialized: false,
    cookie: {expires: 200000,},
}));


app.use(bodyparser.urlencoded({extended:true}));










app.use('/' ,router);
app.listen(2000);
