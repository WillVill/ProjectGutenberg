'use strict';
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {

  Given(/^I am the application user$/, function(callback) {
    callback(null, 'pending');
  });

  When(/^I select an author and click {stringInDoubleQuotes}$/, function(callback) {
    callback(null, 'pending');
  });

  Then(/^I should see the books written by author and the mentioned cities on a map.$/, function(callback) {
    callback(null, 'pending');
  });

});


  // Given('I am on the Cucumber.js GitHub repository', function() {
  //   return this.driver.get('https://github.com/cucumber/cucumber-js/tree/master');
  // });

  // When('I click on {stringInDoubleQuotes}', function (text) {
  //   return this.driver.findElement({linkText: text}).then(function(element) {
  //     return element.click();
  //   });
  // });

  // Then('I should see {stringInDoubleQuotes}', function (text) {
  //   var xpath = "//*[contains(text(),'" + text + "')]";
  //   var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
  //   return this.driver.wait(condition, 5000);
  // });
// module.exports = function() {

//   this.Given(/^I am the application user$/, function(callback) {
//     callback.pending();
//   });

//   this.When(/^I select an author and click {stringInDoubleQuotes}$/, function(callback) {
//     callback.pending();
//   });

//   this.Then(/^I should see the books written by author and the mentioned cities on a map.$/, function(callback) {
//     callback.pending();
//   });
// };
