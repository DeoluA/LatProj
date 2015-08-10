//accounts Schema
var mongoose = require('mongoose');


var LocalUserSchema = new mongoose.Schema({
	username: String,
	password: String
});


Users = mongoose.model('userauths', LocalUserSchema);