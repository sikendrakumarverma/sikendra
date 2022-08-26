const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    userid: {
        type: ObjectId,
        ref: "User"
    }, 
    productid: {
        type: ObjectId,
        ref: "Product"
    },
    amount:Number,
    isFreeAppUser:Boolean,
    date:String
    

}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema) //users
