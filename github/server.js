//server.js
	var express			= require('express');
	var mongoose		= require('mongoose');
	var app				= express();
	var database		= require('./config/database');
	var favicon 		= require('serve-favicon');
	var logger			= require('morgan');
	var bodyParser		= require('body-parser');
	var cookieParser	= require('cookie-parser');
	var passport 		= require('passport')
  	var LocalStrategy 	= require('passport-local').Strategy;
  	var db 				= mongoose.connection;

	var Account			= require('./config/models/account');



	// ================================================================================= //

	
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback() {
  		console.log('Connected to DB');
	});


	//what people see when they land on the page
	app.get("/", function(req, res){
		res.sendFile(__dirname + "/client/index.html");
	});

	//static files
	app.use(express.static(__dirname + '/client/'));

	//node listening port
	app.listen(3000, function() {
		console.log("Hello from node!\nYou're working from the " + __dirname + " directory.\nI'm listening here...")
	});

	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	//app.use(express.session({ secret: 'SECRET' }));
	app.use(cookieParser());

	
	//passport
	// passport config
	app.use(passport.initialize());
  	app.use(passport.session());


  	//post for sign-in
  	app.post('/',
		  passport.authenticate('local', {
		    successRedirect: '/loginSuccess',
		    failureRedirect: '/loginFailure'
  		})
	);

	app.get('/loginFailure', function(req, res, next) {
	  res.send('Failed to authenticate');
	});
 
	app.get('/loginSuccess', function(req, res, next) {
	  res.send('Successfully authenticated');
	});

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});
 
	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});

	passport.use(new LocalStrategy(function(username, password, done) {
	  process.nextTick(function() {
	    // Auth Check Logic
		    UserDetails.findOne({
	      'username': username, 
	    }, function(err, user) {
	      if (err) {
	        return done(err);
	      }
	 
	      if (!user) {
	        return done(null, false);
	      }
	 
	      if (user.password != password) {
	        return done(null, false);
	      }
	 
	      return done(null, user);
	    });
	  });
	}));

	//remove here
	var Schema = mongoose.Schema;
	var UserDetail = new Schema({
	      username: String,
	      password: String
	    }, {
	      collection: 'userInfo'
	    });
	var UserDetails = mongoose.model('userInfo', UserDetail);



