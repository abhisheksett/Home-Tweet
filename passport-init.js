
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Post = mongoose.model("Post");

var users = {};

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		console.log("serializing user :", user._id);
		return done(null, user._id);
	});

	passport.deserializeUser(function(id, done){

		//return user object back
		User.findById(id, function(err, user){
			if(err){
				return done(err, false);
			}

			if(!user){
				return done("User not found", false);
			}

			return done(null, user);
		});
	});

	passport.use('login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done){

		User.findOne({username: username}, function(err, user){
			if(err){
				console.log("login error:"+err);
				return done(err, false);
			}

			if(!user){
				return done(null, false, {message: 'User not found!!!'});
			}

			if(!isValidPassword(user, password)){
				return done(null, false, {message: 'Incorrect Password!!!'});
			}

			return done(null, user);
		});
	}
	));

	passport.use('signup', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done){

		User.findOne({username: username}, function(err, user){
			if(err){
				return done(err, false);
			}

			if(user){
				return done(null, false, {message: 'User already exists!!'});
			}

			var newUser = User();
			newUser.username = username;
			newUser.password = createHash(password);
			newUser.save(function(err, user){
				if(err){
					return done(err, false);
				}

				return done(null, user);
			});
		});
	}
	));

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};

	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
}