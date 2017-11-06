require('./bundle-config');
var application = require('application');
var tnsOAuthModule = require("nativescript-oauth");

var facebookInitOptions = {
    clientId: '137605640319371',
    clientSecret: 'e627593087ee344069318adc860b56ab',
    scope: ['email'] //whatever other scopes you need
};

tnsOAuthModule.initFacebook(facebookInitOptions);

application.start({ moduleName: 'main-page' });