const mongoose = require('mongoose');
const Users = mongoose.model('Users');
// const Promise = require('bluebird');
const Promise = require('mpromise');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const  passport = require('passport');
const auth = require('../middleware/Authentication');

let myToken;

mongoose.Promise = global.Promise;
exports.createUser = (req, res, next) => {

    let NewUser = new Users(req.body);

    NewUser.save ((err, user) => {
        if (!user){

            next( boom.unauthorized(err.errors));

        }
        else {
          // next( boom.unauthorized(err.message));
            res.json(user);

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
            next(boom.forbidden('bad Request'));

        }});

};

exports.userProfile = (req, res) => {

    Users.findOne({email : myToken.email},(err, user) => {
                if(!user)
                    res.send("No User Found");
                res.send(user);

            })
};



    // const decode = jwt.verify(myToken,'secret' ,(err, decoded) => {
    //
    //     Users.findOne({email : decoded.email},(err, user) => {
    //         if(!user)
    //             res.send("No User Found");
    //         res.send(user);
    //
    //     })
    //
    // });};

//remove users from the db
exports.Remove = (req, res) => {
    const id = req.query.access_token.toString();

    Users.remove({id},(err, user) => {
        if (err)
            console.log(err);
        res.send("Users  deleted");

    })
};



