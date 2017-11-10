require('./bundle-config');
var application = require('application');
var tnsOAuthModule = require("nativescript-oauth");

var facebookInitOptions = {
    clientId: '',
    clientSecret: '',
    scope: ['email'] //whatever other scopes you need
};

tnsOAuthModule.initFacebook(facebookInitOptions);

application.start({ moduleName: 'main-page' });
