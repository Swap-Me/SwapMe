var observableModule = require('data/observable');
var frameModule = require("ui/frame");
var imagepicker = require("nativescript-imagepicker");
var firebase = require("nativescript-plugin-firebase");
var pageData = new observableModule.Observable();
var list;
var imageSrc;
var user;

var imageSource;
var itemName;
var itemDesc;

function pageLoaded(args) {
    var page = args.object;
    list = page.getViewById("urls-list");
    imageSrc = page.getViewById("imageSrc");
    var userInformation = page.navigationContext;
    user = userInformation;
    imageSource = page.getViewById("imageSrc");
    itemName = page.getViewById("itemName");
    itemDesc = page.getViewById("itemDesc");
}

function backButtonClicked(args){
    goBack();
}

function goBack(){
    if (frameModule.topmost().canGoBack) {
        frameModule.topmost().goBack();
    } else {
        frameModule.topmost().navigate(navigationEntry);
    }
}
exports.backButtonClicked = backButtonClicked;

exports.pageLoaded = pageLoaded;
function onSelectMultipleTap(args) {
    var context = imagepicker.create({ mode: "multiple" });
    startSelection(context, false);
}
exports.onSelectMultipleTap = onSelectMultipleTap;
function onSelectSingleTap(args) {
    var context = imagepicker.create({ mode: "single" });
    startSelection(context, true);
}

exports.saveItem = function(args) {
    var page = args.object;
    sampleName = "Sample Item";
    sampleText = "Sample Description";
    firebase.push(
        '/items',
        {
            'itemDescription': sampleName,
            'itemName': sampleText,
            'itemPicture': imageSource.src,
            'itemType': "furniture",
            'itemId': Math.floor(Math.random() * (10000 - 20)) + 20,
            'ownerId': user.uid
        }
    ).then(
        function (result) {
            const topFrame = frameModule.topmost();
            const navEntry = {
                moduleName: "test",
                context: user
            };
            topFrame.navigate(navEntry);
        }
    );
    

}

exports.onSelectSingleTap = onSelectSingleTap;
function startSelection(context, isSingle) {
    context
        .authorize()
        .then(function () {
        list.items = [];
        return context.present();
    })
        .then(function (selection) {
        console.log("Selection done:");
        selection.forEach(function (selected) {
            console.log("----------------");
            console.log("uri: " + selected.uri);
            if (isSingle) {
                selected.getImage({ maxWidth: 200, maxHeight: 200, aspectRatio: 'fill' })
                    .then(function (imageSource) {
                    imageSrc.src = imageSource;
                });
            }
            else {
                imageSrc.visibility = 'hidden';
            }
        });
        list.items = selection;
    }).catch(function (e) {
        console.log(e);
    });
}

