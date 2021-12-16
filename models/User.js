const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-async-await");

const schema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		dropDups: true
	},
	password: String,
	pin: Number,
	type: {
		type: String,
		default: 'user'
	},
	firstname: String,
	lastname: String,
	status: {
		type: Number,
		default: 1
	}
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', schema);