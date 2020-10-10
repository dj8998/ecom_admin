const express = require('express');
const router = express.Router();
const {signup, signin} = require('../controller/auth')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');

router.post('/signin', validateSigninRequest, isRequestValidated, signin)

router.post('/signup', validateSignupRequest, isRequestValidated , signup)

// router.post('/profile', reqiredSignin, (req, res) =>{
//     res.status(200).json({message:"proflie"})
// })

module.exports = router;