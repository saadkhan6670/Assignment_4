const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Promise = require("bluebird");
const jwt = require('jsonwebtoken');
const boom = require('boom');

let myToken;

exports.createUser = (req, res, next) => {

    const NewUser = new Users(req.body);

    NewUser.save ((err, user) => {
        if (user)
            res.json(user);

        else {
           next( boom.forbidden('forbidden'));

            // var err = new Error(err);
            // err.status = 403;
            // next(err);
        }
    })};

exports.ShowUsers = (req, res) => {
    const decode = jwt.verify(myToken,'secret' ,(err, decoded, next) => {

        Users.find({},(err, user) => {
            if(!user)
                res.send(err);
             else
                 res.send(user);
        })

    });};

exports.logInUser= (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({
        email , password
    }, (err, user) => {

        if (user) {

            // if user is found and password is right
            // create a token
           myToken = jwt.sign({
                id: user._id ,
                email}, 'secret', {
                expiresIn: 10 * 60000 // expires in 10 mins
            });

            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: myToken
            });
            exports.myToken =myToken;
        }
        else {
            next(boom.badRequest('bad Request'));

            // const err2 = new Error('Unauthorized');
            //
            // err2.status = 401;
            // next(err2);
        }});

};

exports.userProfile = (req, res) => {
    const decode = jwt.verify(myToken,'secret' ,(err, decoded) => {

        Users.findOne({email : decoded.email},(err, user) => {
            if(!user)
                res.send("No User Found");
            res.send(user);

        })

    });};

//remove users from the db
exports.Remove = (req, res) => {
    const id = req.query.access_token.toString();

    Users.remove({id},(err, user) => {
        if (err)
            console.log(err);
        res.send("Users  deleted");

    })
};



