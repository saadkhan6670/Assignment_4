const express = require( 'express');
const app = express();
const router = express.Router();
const user = require('./controller');
const auth = require('../middleware/Authentication');
const expressJWT = require('express-jwt');

router.post('/create-user', user.createUser);
router.post('/login-user',user.logInUser);

router.get('/remove-user', user.Remove);
router.get('/show-users' , user.ShowUsers);


router.get('/user-profile',auth.authenticate, user.userProfile);


module.exports = router;

