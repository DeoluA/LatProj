//server.js
	var express			= require('express');
	var mongoose		= require('mongoose');
	var app				= express();
	var database		= require('./config/database');
	var favicon 		= require('serve-favicon');
	var logger			= require('morgan');
	var bodyParser		= require('body-parser');
	var cookieParser	= require('cookie-parser');
	var passport 		= require('passport');
  	var LocalStrategy 	= require('passport-local').Strategy;
  	var flash           = require('connect-flash');         //Connect-flash allows for passing session flashdata messages.
  	var methodOverride 	= require('method-override');       // simulate DELETE and PUT (express4)
  	var session         = require('express-session');



	// ================================================================================= //

	var db 				= mongoose.connect(database.url).connection;
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

	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	//app.use(express.session({ secret: 'SECRET' }));
	app.use(cookieParser());
	app.use(methodOverride());

	
	//passport
	// passport config
	require('./config/passport')(passport);
	app.use(passport.initialize());
  	app.use(passport.session());

  	//post for sign-in
  	app.post('/',
		  passport.authenticate('local-login', {
		    successRedirect: '/loginSuccess',
		    failureRedirect: '/loginFailure'
  		})
	);
	app.get('/loginFailure', function(req, res, next) {
	  res.send('Failed to authenticate!<br />Please provide correct username/password, or <a href="../">register</a>!');
	});
	app.get('/loginSuccess', function(req, res, next) {
	  res.send('Successfully authenticated.<br />Your voucher is....');
	});

	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/signupSuccess', 
        failureRedirect : '/signupFailure',
    }));
    app.get('/signupSuccess', function(req, res, next) {
	  res.send('Congrats!!<br />Please go to <a href="../">Home page</a> and login with your credentials!');
	});
    app.get('/signupFailure', function(req, res, next) {
	  res.send('There was an error!<br /><a href="../">Please try again</a>!');
	});


	//node listening port
	app.listen(3000, function() {
		console.log("Hello from node!\nYou're working from the " + __dirname + " directory.\nI'm listening here...")
	});