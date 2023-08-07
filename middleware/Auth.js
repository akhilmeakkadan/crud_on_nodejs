class Auth{

	static validate (req,res,next){
		//console.log('Checked Auth Middleware');
		next();
	}
}
module.exports = Auth;
