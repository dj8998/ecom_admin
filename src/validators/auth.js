const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
    .notEmpty().withMessage('firstName is required'),
    check('lastName')
    .notEmpty().withMessage('lastNane is required'),
    check('email')
    .notEmpty().withMessage('email is required'),
    check('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
];

exports.validateSigninRequest = [
    check('email')
    .notEmpty().withMessage('email is required'),
    check('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
];

exports.isRequestValidated = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}