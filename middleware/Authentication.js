const jwt = require('jsonwebtoken');
const control = require('../user/controller');
const boom = require('boom');

exports.authenticate = function(req, res, next) {
    let paramToken = req.header('Authorization');
    let token = control.myToken;

// is used to compare two arrays
if (JSON.stringify(paramToken) !== JSON.stringify(token)){
    next(boom.unauthorized('invalid Token'));
}
else{
    console.log("valid token");
    const decode = jwt.verify(paramToken,'secret');
    //next();
    }


};