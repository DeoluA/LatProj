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

  	var routes 			= require('./routes/index');
	var users 			= require('./routes/users');
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
	app.use(express.session({ secret: 'SECRET' }));
	app.use(cookieParser());
	app.use(passport.initialize());
  	app.use(passport.session());

	
	//passport
	// passport config
	passport.use(new LocalStrategy(Account.authenticate()));
	passport.serializeUser(Account.serializeUser());
	passport.deserializeUser(Account.deserializeUser());
