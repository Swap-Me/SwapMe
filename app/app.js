/*
  Functionality of app
*/

require('./bundle-config');
var application = require('application');
var firebase = require("nativescript-plugin-firebase");
//initializing firebase, if sucessful integration display sucess message else display error in failure
firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
    function (instance) {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

//load the main-page.xml while starting the app
application.start({ moduleName: 'main-page' });


