const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://sikendrakumar:wtCKMS5cQpIjdBOE@cluster0.oexuw0b.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

const moment=require('moment')
const time=moment()
app.use (
    function (req, res, next) {
        console.log ("Hi i am in global middleware which show on each API'S")
        //console.log (new Date());
        console.log (time.format('YYYY.MM.DD'),",",time.format('h:mm:ss'),",",req.ip,",",req.originalUrl);
        
        //console.log (req.ip);
        //console.log (req.originalUrl);
        next();
  }
  );

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
