const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt-nodejs');

const accountRepo = require('../controller/accountRepo');

module.exports = function(passport) {
	passport.serializeUser(function(user, done){
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
		accountRepo.singleId(id).then(rows => {
			done(null, rows);
		})
		.catch(function(err){
		console.log(err);
		done(err);
		});
	});
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email', passwordField : 'password', passReqToCallback : true}, 
		function(req, email, password, done){
			accountRepo.singleUsername(email, (rows) => {
				if(password.length < 6)
				{
					return done(null, false, req.flash('signupMessage', 'Mật khẩu phải chứa ít nhất 6 kí tự'));
				}
				if(rows)
				{
					return done(null, false, req.flash('signupMessage', 'Email đã tồn tại'));
				}
				else{
					const newUser = {
						Username: email,
						Password: bcrypt.hashSync(password, null, null),
					};
					accountRepo.add(newUser, (rows) => {
						return done(null, rows);
					})
				}
			})
			.catch(function(err){
			console.log(err);
			done(err);
			});
		})
	);



	passport.use('local-login', new LocalStrategy({
		usernameField : 'email', passwordField : 'password', passReqToCallback : true}, 
		function(req, email, password, done){
			accountRepo.singleUsername(email, (rows) => {
				if(!rows) {
					return done(null, false, req.flash('loginMessage', 'Không tìm thấy email'));
				}
				if(!bcrypt.compareSync(password, rows.Password)) {
					return done(null, false, req.flash('loginMessage', 'Sai mật khẩu'));
				}
				console.log("OK");
				return done(null, rows);
			})
			.catch(function(err){
    		console.log(err);
			done(err);
			});
		})
	);
}
