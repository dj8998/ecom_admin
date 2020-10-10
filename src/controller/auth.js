const User = require('../models/user');
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')

exports.signup = (req, res) => {
	User.findOne({ email: req.body.email })
	.exec((error, user) => {
		if(user)
			return res.status(400).json({
				message:"user already registered"
			});

		const { 
			firstName,
			lastName,
			email,
			password
		} = req.body;

		const _user = new User({ 		
			firstName,
			lastName,
			email,
			password,
			username: Math.random().toString()
		});

		_user.save((errr, data) => {
			console.log(error);
			if(errr){
				return res.status(400).json({
				message: 'something went wrong'
				
			})
			};

			if(data){
				return res.status(201).json({
				user: data
			});
			}
		})
	})
}

exports.signin = (req, res) => {
	User.findOne({email: req.body.email}).exec((error, user) => {
		if(error)
			return res.status(404).json({error});
		if(user){

			if(user.authenticate(req.body.password)){
				var token = jwt.sign({_id: user._id, role: user.role}, "heheh", {expiresIn: '5h'});
				const { _id, firstName, lastName, email, role, fulname} = user;
				res.status(200).json({
					token,
					user: {
						_id, firstName, lastName, email, role, fulname
					}
				});
			}else{
				return res.status(400).json({
					message:"Invalid pass"
				})
			}


		}else{
			return res.status(404).json({message:"something wrong"})
		}
	})
}

