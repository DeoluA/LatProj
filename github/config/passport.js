//passport.js

var LocalStrategy 	= require('passport-local').Strategy;	

//get our user schema from our user model
var UserDetails		= require('./models/user.js');


module.exports = function(passport){

	//serialize user for session
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});
 
	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});


	//sign-up for a specific user
	passport.use('local-signup',new LocalStrategy(
		{usernameField : 'email'},
		function(email, password, done) {
        process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        	UserDetails.findOne({ 'email': email,
        }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false);
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new UserDetails();

                // set the user's local credentials
                newUser.email    = email;
                newUser.password 	= password;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });    
        });
    }));
	//login for a specific user
	passport.use('local-login',new LocalStrategy(
		{usernameField : 'email'},
		function(email, password, done) {
	  process.nextTick(function() {
	    // Auth Check Logic
		    UserDetails.findOne({
	      'email': email, 
	    }, function(err, user) {
	    	//return errors if any
	      if (err) {
	        return done(err);
	      }
	 
	      //if user is not found
	      if (!user) {
	        return done(null, false, { message: 'email not found!' });
	      }

	      //if user is found, but password is wrong
	      if (user.password != password) {
	        return done(null, false, { message: 'Incorrect password!' });
	      }
	 
	      return done(null, user);
	    });
	  });
	}));
}