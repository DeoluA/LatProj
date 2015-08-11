//accounts Schema
var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var UserDetail = new Schema({
      email: String,
      password: String
    }, {
      collection: 'userInfo'
    });
//expose our schema
module.exports = mongoose.model('userInfo', UserDetail);