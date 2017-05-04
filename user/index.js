const express = require( 'express');
const app = express();
const router = express.Router();
const user = require('./controller');
const auth = require('../middleware/Authentication');
const expressJWT = require('express-jwt');

router.post('/create-user', user.createUser);
router.post('/login-user',user.logInUser);

router.post('/remove-user',auth.authenticate, user.Remove);
router.get('/show-users' ,auth.authenticate, user.ShowUsers);

router.put('/update-user/:email', user.UpdateUser);
router.get('/list-user/:param', user.ListUsers);

router.get('/user-profile',auth.authenticate, user.userProfile);

router.post('/user-posts',auth.authenticate,user.CreatePost);
router.delete('/delete-post/:postid',auth.authenticate,user.DeletePost);

router.put('/followers/:userid');
router.put('/unfollow/:userid');


module.exports = router;

