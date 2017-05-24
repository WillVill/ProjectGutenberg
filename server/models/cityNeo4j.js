
const City = module.exports = function (cityObj) {
    const city = cityObj.properties;
    this.name = city.name;
    this.asciiName = city.asciiName;
    this.loc = city.loc;
    this.countryCode = city.countryCode;
};