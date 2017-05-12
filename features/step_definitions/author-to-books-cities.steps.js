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
