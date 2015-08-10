//database.js

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hotspot_clients');
/*module.exports({
	//mongoose.connection('mongodb://localhost:27017/hotspot_clients');
	var url = 'mongodb://localhost:27017/hotspot_clients';
});*/