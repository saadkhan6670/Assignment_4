const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Posts = mongoose.model('Posts');
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
                name: user.firstname,
                message:  'Enjoy your token!',
                token: myToken
            });
            exports.myToken =myToken;
        }
        else {
            next(boom.forbidden('bad Request'));

        }});

};

exports.userProfile = (req, res,next) => {
    var UserData = req.user;

    Users.findOne({ _id: UserData._id }).populate('posts followers','-followers -posts -_id -__v -password').exec(function (err, user) {
  if (!user){ 
      res.send(err);
    }
else{
  res.send(user);}
});

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

exports.ListUsers = (req, res,next) => {
    var input = req.params.param;

        Users.find({}).sort(input).exec(function(err, doc) {

            if(err){
            next(boom.forbidden('bad Request'));
            }

                else {
           res.send(doc);

        }});
};

exports.CreatePost = (req, res) => {

      let NewPost = new Posts({
          post: req.body.post,
          creator : req.user._id

      });

    NewPost.save ((err, post) => {
        let authUser = req.user;
        if (err) {
           next(boom.unauthorized(err.toString()));
        }

        else {
            res.send(post)
            authUser.posts.push(post);
            authUser.save((err,posted) => {
            console.log(posted);
     });
    } 
  })
};


exports.DeletePost = (req, res) => {


    var postid = req.params.postid;

  Posts.findById({ _id :postid}, (err,post) =>{ 

      post.remove((err) =>{

          Users.update({ _id : post.creator},{$pull:{posts : post._id }} , (err)=>{
                if(err){
                    res.send(err);
                }

                else{res.send("Users Post Deleted");}
          })
      })
   })         
};

exports.FollowUser = (req, res) => {

    Users.findOne({_id: req.params.userid},(err,followuser)=>
    {
       let  UserLogedIn = req.user;
       console.log(UserLogedIn._id);
      
       followuser.followers.push(UserLogedIn._id);
        followuser.save((err , done ) => {
            if(err){
                res.send(err);
            }
            else
            {
            res.send("You Followed" + followuser.firstname);
            }
        });
    });
};

exports.UnFollowUser = (req, res) => {

  Users.findById({ _id :req.params.userid}, (err,followuser) =>{ 

      followuser.remove((err) =>{

          Users.update({ _id : followuser.followers},{$pull:{posts : post._id }} , (err)=>{
                if(err){
                    res.send(err);
                }

                else{res.send("Users Post Deleted");}
          })
      })
   })         
};

}






