const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes/route.js')
const  mongoose  = require('mongoose')
const app = express()



app.use(bodyParser.json())

mongoose.connect("mongodb+srv://plutoniumVikas:1234567890@cluster-v.0x22h8i.mongodb.net/group62Database", {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.use(function (req, res) {
    return res.status(400).send({status : false, message : "path not found"})
    });


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
