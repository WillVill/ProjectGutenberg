var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
	name: String,
	geo: Number
});

var City = mongoose.model('City', citySchema);

module.exports = City;
