const express = require('express');
const bodyParser = require('body-parser'); 
const route = require('./route/route');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://project-B:project1@project1-blogging.oe7lrmu.mongodb.net/Blogging-P1').then(() => console.log('MongoDB is connected'))
             .catch((error) => console.log(error));

app.use('/', route);
app.listen(process.env.PORT || 2000, function(){
    console.log('Express is running on '+ (process.env.PORT || 2000));
})