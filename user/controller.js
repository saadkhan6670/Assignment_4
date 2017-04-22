import mongoose from 'mongoose';
const Users = mongoose.model('Users');
import Promise from 'mpromise';
import boom from 'boom';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as bearerStrategy} from 'passport-http-bearer';
import jwt from 'jsonwebtoken';

let myToken;

mongoose.Promise = global.Promise;

export function createUser(req, res, next) {

    const NewUser = new Users(req.body);

    NewUser.save ((err, user) => {
        if (user)
            res.json(user);

        else {
            var err = new Error(err);
            err.status = 403;
            next(err);
        }
    })}

export function ShowUsers(req, res) {
    const decode = jwt.verify(myToken,'secret' ,(err, decoded, next) => {

        Users.find({},(err, user) => {
            if(user)
                res.send(user);

        })

    });}

export function logInUser(req, res, next) {

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
        }
        else {

            const err2 = new Error('Unauthorized');

            err2.status = 401;
            next(err2);
        }});


    // Users.findOne({email: email,password :password},function (err,user) {
    //     if(err ){
    //         console.log(err);
    //         res.sendStatus(500);}
    //     if(!user ){
    //          res.send("No such user");}
    //
    //          else {
    //          myToken = jwt.sign({
    //             id: user._id,
    //             email: email},'secret',{ expiresIn: '60000' });
    //
    //          res.send(user._id+" Welcome User having TOKEN :  " + myToken);}
    //
    // })

}

export function userProfile(req, res) {
    const decode = jwt.verify(myToken,'secret' ,(err, decoded) => {

        Users.findOne({email : decoded.email},(err, user) => {
            if(!user)
                res.send("No User Found");
            res.send(user);

        })

    });}

//remove users from the db
export function Remove(req, res) {
    const id = req.query.access_token.toString();

    Users.remove({id},(err, user) => {
        if (err)
            console.log(err);
        res.send("Users  deleted");

    })
}