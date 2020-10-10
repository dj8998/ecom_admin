const jwt = require('jsonwebtoken');

exports.reqiredSignin = (req, res, next ) => {
	if(req.headers.authorization){
		const token = req.headers.authorization.split(" ")[1];
		const user = jwt.verify(token, 'heheh');
		req.user = user
		console.log(token);
		next();
		// jwt.decode()
	}
	else res.status(400).json({message: "authorization required"})

}

exports.userMiddleware = (req, res, next) => {
	if(req.user.role !== 'user'){
		return res.status(400).json({message: "admin denied"})
	}
	next();
}

exports.adminMiddleware = (req, res, next) => {
	if(req.user.role !== 'admin'){
		return res.status(400).json({message: "user access denied"})
	}
	next();
}