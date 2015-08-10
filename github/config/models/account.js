//accounts

var LocalUserSchema = new mongoose.Schema({
	username: String,
	salt: String,
	hash: String
});

var Users = mongoose.model('userauths', localUserSchema);
