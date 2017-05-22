var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
    geo: Number,
	name: String,
    asciiName: String,
	longitude: Number,
    latitude: Number,
    countryCode: String
});

var City = mongoose.model('City', citySchema);

module.exports = City;
