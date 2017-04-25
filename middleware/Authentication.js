const jwt = require('jsonwebtoken');
const control = require('../user/controller');
const boom = require('boom');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

exports.authenticate = function(req, res, next) {
    let paramToken = req.header('Authorization');
    let token = control.myToken;

// is used to compare two arrays
if (JSON.stringify(paramToken) !== JSON.stringify(token)){
    next(boom.unauthorized('invalid Token'));
}
else{
    console.log("valid token");
    let decode = jwt.verify(paramToken,'secret',(err, decoded) => {
        req.decode = decode;
        next();


    // Users.findOne({email : decoded.email},(err, user) => {
    //         if(!user){
    //             next(boom.unauthorized('invalid Token'));}
    //         req.user = user;
    //         next();
    //     });
    });}


};