const User = require('../../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req, res) => {



	User.findOne({ email: req.body.email })
	.exec(async (error, user) => {
		if(user)
			return res.status(400).json({
				message:"admin already registered"
			});

		const { 
			firstName,
			lastName,
			email,
			password
		} = req.body;

		const hash_password = await bcrypt.hash(password, 10);

		const _user = new User({ 		
			firstName,
			lastName,
			email,
			hash_password,
			username: shortid.generate() ,
			role: 'admin'
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
				message: 'Admin created Sucessfully'
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

			if(user.authenticate(req.body.password ) && user.role === 'admin'){
				var token = jwt.sign({_id: user._id, role: user.role}, "heheh", {expiresIn: '1h'});
				const { _id, firstName, lastName, email, role, fulname} = user;
				res.cookie('token', token, {expiresIn: '2h'})
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


exports.signout = (req, res) => {
	res.clearCookie('token');
	res.status(200).json({
		message: 'Signout Sucessfully'
	})
}