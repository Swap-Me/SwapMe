/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

require('./bundle-config');
var application = require('application'),
    tnsOAuthModule = require('nativescript-oauth'),
    facebookInitOptions = {
      clientId: '137605640319371',
      clientSecret: 'e627593087ee344069318adc860b56ab',
      scope: ['email'] //whatever other scopes you need
    };
application.start({ moduleName: "index" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
