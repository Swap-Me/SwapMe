var observableModule = require('data/observable');
var frameModule = require("ui/frame");
var pageData = new observableModule.Observable();
var firebase = require("nativescript-plugin-firebase");
var camera = require("nativescript-camera");
var imageModule = require("ui/image");
var done;
var user;

//This function displays user's name, picture and info in the profile page. 
exports.pageLoaded = function(args) {
    var page = args.object;
    var userInformation = page.navigationContext;
    user = userInformation;

    var saveDescription = function()
    {
        testVar = page.getViewById("profileDescription").text;
        user.userDescription = testVar;
    }

    //Profile page should show info retrieved from info, so this function retrieves relevant info
    function queryUsers(uid) {
        firebase.query(result => {
            done = JSON.stringify(result);
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
        return done;
    }

    page.bindingContext = saveDescription();    

    var itsame = queryUsers(userInformation.uid);
    var profile = page.getViewById("profile");
    var name = page.getViewById("name");
    var picture = page.getViewById("profilePicture");
    var description = page.getViewById("profileDescription");
    var newDesc = page.getViewById("saveDesc");
    
    if (itsame !== undefined) {
        userInformation = JSON.parse(itsame)
        if (description.text !== undefined) {
            user.userDescription = description.text;
            if (description.text === "") {
                description.text = "I am a RPI student about to graduate looking to trade items! :D";
            }
        }
        else {
            user.userDescription = "I am a RPI student about to graduate looking to trade items! :D";
        }
        description.text= user.userDescription;
        name.text = userInformation.value.name
        picture.src = userInformation.value.profilePicture
        
    }
    else {
        frameModule.topmost().navigate({ moduleName: "profile"});
    }
};

/*Profile page consist of inventory where users can add item. Function accessed user's camera so user
can upload piture of items they want to trade*/
exports.addItem = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    getProf = page.getViewById('profile');
    
    //ask camera persmissin
    camera.requestPermissions();
    var options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };
    camera.takePicture(options).then(function (imageAsset) {
        console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
        console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
 
exports.gallery = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "gallery",
        context: user
    };
    topmost.navigate(navigationEntry);
};


exports.profileEdit = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "profileEdit",
        context: user
    };
    topmost.navigate(navigationEntry);
};

function backButtonClicked(args){
    goBack();
}

function goBack(){
    if (frameModule.topmost().canGoBack) {
        frameModule.topmost().goBack();
    } else {
        var navigationEntry = {
            moduleName: "test",
            context: user
        };
        frameModule.topmost().navigate(navigationEntry);
    }
}

//loggging out from facebook
exports.tapLogout = function (args) {
    firebase.logout();
    const topFrame = frameModule.topmost();
    const navEntry = {
        moduleName: "main-page"
    };
    topFrame.navigate(navEntry);
}

exports.backButtonClicked = backButtonClicked;