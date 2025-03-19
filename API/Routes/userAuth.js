const express = require('express');
import { UserLogIn, UserLogOut, UserSignUp } from './../Controllers/index';

const router = express.Router();

router.post('/user/signup', UserSignUp);
router.get('/user/login', UserLogIn);
router.post('/user/logout', UserLogOut);