

const control = require('../user/controller');

exports.display = function(req, res, next) {

let token = control.myToken;

//console.log(typeof token);

let token1 = token.split(".");



    console.log(token[0]);

    console.log("I m from middle ware");
    next();


};