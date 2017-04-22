import express from 'express';
const app = express();
const router = express.Router();
import user from './controller';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import expressJWT from 'express-jwt';

router.use(expressJWT({secret:'secret'}).unless({path: [
    '/user/login-user',
    '/user/create-user' ]}));


router.post('/create-user' , user.createUser);
router.post('/login-user',user.logInUser);

router.get('/remove-user', user.Remove);
router.get('/show-users' , user.ShowUsers);


router.get('/user-profile', user.userProfile);


export default router;

