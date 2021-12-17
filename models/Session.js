const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-async-await");

const schema = mongoose.Schema({
	id: String,
	username: String,
	status: String,
	type: String,
	token: String,
	createdAt: {
		type: Date,
		expires: parseInt(process.env.SESSION_EXP),
		default: Date.now
	}
}, {
	collection: 'session'
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Session', schema);