const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Users = mongoose.model('Users');
const control = require('../user/controller');

exports.display = function(req, res, next) {
    let paramToken = req.header('Authorization').split(".");

let token = control.myToken.split(".");

if (paramToken[1] === token[1]){
    console.log("valid token");
    const decode = jwt.verify(myToken,'secret' ,(err, decoded) =>{
        Users.findOne({email : decoded.email});

            next();
        })
}

else
    console.log("invalid token");
res.end();



};