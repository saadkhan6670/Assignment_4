const jwt = require('jsonwebtoken');
const boom = require('boom');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

exports.authenticate = function(req, res, next) {
    let paramToken = req.header('Authorization');

    if(!paramToken){
        next(boom.unauthorized('Empty Token'));
    }
    else
    {
    let decode = jwt.verify(paramToken,'secret',(err, decoded) => {
        if (err){
            next(boom.unauthorized('Invalid or Unauthorized Token'))
        }
        else{

        Users.findOne({email : decoded.email},(err, user) => {
            if(!user || err){
                next(boom.unauthorized('invalid User'));}
            req.user = user;
            next();
        });}
    });}
};
