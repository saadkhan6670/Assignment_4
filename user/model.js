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
    email : { type:String, validate:emailValidate,
        unique: true, lowercase:true,normalized: String,
        required: [true, 'Users email required']},
    phone : {type:Number,
        validate:phoneValidate,
        required: [true, 'Users phone number required']},
    password : String,
    posts : [{ type: Schema.Types.ObjectId, ref: 'Posts' }]
});

const UserPost = new Schema({
    post : String,
    creator: [{ type: Schema.Types.ObjectId , ref:'Users' }]
})                              

module.exports = mongoose.model('Users', UserSchema);
module.exports = mongoose.model('Posts', UserPost );