const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

const emailValidate =[
    validate({
        validator : 'matches',
        arguments:/^[\w.]+[@]+[a-zA-Z]+.com$/,
        message:'Invalid Email'
    })
];

const phoneValidate =[
    validate({
        validator : 'matches',
        arguments:/^923[1-9]{9}$/,
        message:'Invalid Phone'
    })
];

const UserSchema = new Schema ({
    firstname : String,
    lastname : String,
    email : { type:String, validate:emailValidate, unique: true, lowercase:true, message:'Invalid email' },
    phone : {type:Number, validate:phoneValidate, message:'Invalid Phone'},
    password : String

});

module.exports = mongoose.model('Users', UserSchema);