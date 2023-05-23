var mongoose = require("mongoose"),
	ObjectId = mongoose.Schema.Types.ObjectId;

var ClientSchema = mongoose.Schema({
	description: String,
	tags: [ String ],
	owner : { type: ObjectId, ref: "User" }
});

var Client = mongoose.model("Client", ClientSchema); 
module.exports = Client;