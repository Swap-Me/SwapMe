var tnsOAuthModule = require('nativescript-oauth');
//Observable = require('data/observable').Observable,

exports.tapLogin = function () {
  // this.counter--;
  // this.set('message', getMessage(this.counter));
  tnsOAuthModule.ensureValidToken()
    .then(function (token) {
      console.log('token: ' + token);
    })
    .catch(function (er) {
      //do something with the error
    });
};

exports.tapLogout = function () {
  tnsOAuthModule.logout()
    .then(function () {
      return console.log('logged out');
    })
    .catch(function (er) {
      console.error('error logging out');
      console.dir(er);
    });
};
