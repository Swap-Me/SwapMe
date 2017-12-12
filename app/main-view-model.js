var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var tnsOAuthModule = require("nativescript-oauth");
var Sqlite = require("nativescript-sqlite");
var firebase = require("nativescript-plugin-firebase");

//function takes userid and queries the user-finfo as a JSON response
function queryUsers(uid) {
    firebase.query(result => {
        return true;
    }, "/users", {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'uid'
            },
            ranges: [
                {
                    type: firebase.QueryRangeType.START_AT,
                    value: uid
                },
                {
                    type: firebase.QueryRangeType.END_AT,
                    value: uid
                }
            ]
    });
}

//Facebook login authentication using firebase, retrieves information of user from facebook 
function createViewModel() {
    var viewModel = new Observable();

    viewModel.tapLogin = function () {
        firebase.login({
            // note that you need to enable Facebook auth in your firebase instance
            type: firebase.LoginType.FACEBOOK
        }).then(
            result => {
                var yeet = result;
                var ya = false;
                console.log(result.uid);
                if (ya === false) {
                    console.log('im in boys', yeet.uid);
                    
                    firebase.push(
                        '/users',
                        {
                            'uid': result.uid,
                            'name': result.name,
                            'email': result.email,
                            'profilePicture': result.profileImageURL,
                            'birthYear': '',
                            'isMale': '',
                            'geolocation': '',
                            'distancePreference': 10
                            
                        }
                    ).then(
                        function (result) {
                            const topFrame = frameModule.topmost();
                            const navEntry = {
                                moduleName: "test",
                                context: yeet
                            };
                            topFrame.navigate(navEntry);
                        }
                    );
                } 
                else {
                    const topFrame = frameModule.topmost();
                    const navEntry = {
                        moduleName: "test",
                        context: yeet
                    };
                    topFrame.navigate(navEntry);
                }
            },
            errorMessage => {
                alert({
                    title: "Login error",
                    message: errorMessage,
                    okButtonText: "OK, pity"
                });
            }
            );
    };

    //loggging out from facebook
    viewModel.tapLogout = function () {
        tnsOAuthModule.logout()
            .then(function () { return console.log('logged out'); })
            .catch(function (er) {
                console.error('error logging out');
                console.dir(er);
            });
    };

    return viewModel;
}

exports.createViewModel = createViewModel;
 
