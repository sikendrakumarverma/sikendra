
const mid1= function ( req, res, next) {
    let HeaderKey=req.headers.isfreeappuser
    console.log("Hi I am a middleware named Mid1")
    console.log(typeof HeaderKey)
    if(!HeaderKey) {
       return res.send("please add isFreeAppUser in headers key")
    }
    console.log("OK HEADERS KEY IS ATTACHED")
    // set isFreeAppUser as a boolean(turue or false) value not string
    req.body["isFreeAppUser"]=HeaderKey;
    next()
}



module.exports.mid1= mid1

