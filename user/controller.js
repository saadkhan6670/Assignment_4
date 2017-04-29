const mongoose = require('mongoose');
const Users = mongoose.model('Users');
// const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const boom = require('boom');

let myToken;

mongoose.Promise = global.Promise;
exports.createUser = (req, res, next) => {

    let NewUser = new Users(req.body);

    NewUser.save ((err, user) => {
        if (err) {
           next(boom.unauthorized(err.toString()));
        }

        else {
            res.json(user);

        }
    })};

exports.ShowUsers = (req, res,next) => {

        Users.find({},(err, user) => {
            if(!user)
                next(boom.unauthorized('No User found'));
            else
                 res.send(user);
        })

    };

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
  res.send( req.user);
};

//remove users from the db
exports.Remove = (req, res,next) => {

    Users.remove({email:req.body.email},(err, user) => {

        if (err)
            next(boom.forbidden('No User Found With this credentials'));
        else {
        res.send("Users  deleted");}
    })
};

exports.UpdateUser = (req, res) => {

    let UpdateUser = req.body;

    if(req.body.email){
        res.send("you cant update email! ");
    }

    else{
    Users.update({email: req.params.email} , UpdateUser, (err, raw) =>{
    if(!raw){
   res.send("xyz");
}
    else{res.send(raw)}
 })
};
};

exports.ListUsers = (req, res) => {

        Users.find().sort({'email': 1}).exec(function(err, users) {

                res.send(users);
});

};



