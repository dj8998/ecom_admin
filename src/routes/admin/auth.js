const express = require('express');
const { reqiredSignin } = require('../../common-middleware');
const {signup, signin, signout} = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');

const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signin' ,validateSigninRequest, isRequestValidated, signin)
router.post('/admin/signout', signout)



// router.post('/profile', reqiredSignin, (req, res) =>{
//     res.status(200).json({message:"proflie"})
// })

module.exports = router;