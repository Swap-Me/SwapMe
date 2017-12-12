/*
    test.js
    Model for test page
*/

// Get all Nativescript modules 
var firebase = require('nativescript-plugin-firebase'),
observableModule = require('data/observable'),
frameModule = require('ui/frame'),
gestures = require('ui/gestures'),

pageData = new observableModule.Observable(),
testPicturesUrl = 'https://s3.amazonaws.com/swapmeimg/objects';
var user;
var ding = [];

// Query Firebase users
function queryItems() {
    firebase.query(result => {
        //console.log('query result:', JSON.stringify(result));
        ding.push(JSON.stringify(result));
    }, 
    '/items', {
        orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: 'itemId'
        },
        limit: {
            type: firebase.QueryLimitType.LAST,
            value: 15
        }
    });
    return ding;
}

// Test Page
exports.loaded = function(args) {
    var _page = args.object;
    _page.bindingContext = pageData;

    var userInformation = _page.navigationContext;
    user = userInformation;
    var coolio = queryItems();

    if (coolio !== undefined) {
        // Get all xml page objects
        var card = _page.getViewById("card"),
        img = _page.getViewById("item"),
        desc = _page.getViewById("desc"),
        name = _page.getViewById("name"),
        verdict = _page.getViewById("verdict"),
        i = 0;
    
        var item = JSON.parse(coolio[i]);

        // Initialize card
        img.src= item.value.itemPicture;
        desc.text = item.value.itemDescription;
        name.text = item.value.itemName;
    
        // Listens for swipe event and records whether they liked the item or not
        card.on(gestures.GestureTypes.swipe, function (args) {
            // Increment test index
            i = i + 1;
            
            // User liked the item -- right
            if(args.direction === 1) {

                // Alter actionbar to show like
                verdict.title='Liked!';
                
                // Animates swipe effect on card -- swipe right
                card.animate({ translate: { x: 1000, y: 100 } })
                    .then(function () { return card.animate({ 
                        translate: { x: 0, y: -2000 } 
                    }); 
                })			    
                .then(function () { 
                    return card.animate({ translate: { x: 0, y: 0 } }); 
                })			    
                .then(function () {
                    item = JSON.parse(coolio[i]);
                    img.src= item.value.itemPicture;
                    desc.text = item.value.itemDescription;
                    name.text = item.value.itemName;
                })
                .catch(function (e) {
                    console.log(e.message);
                });
            }
            // User dislikes an item -- left
            else {

                // Alter actionbar to show dislike            
                verdict.title='Disliked!';

                // Animates swipe effect on card -- swipe left           
                card.animate({ 
                    translate: { x: -1000, y: 100 } 
                })
                .then(function () { 
                    return card.animate({ translate: { x: 0, y: -2000 } }); 
                })			    
                .then(function () { 
                    return card.animate({ translate: { x: 0, y: 0 } }); 
                })			    
                .then(function () {		
                    item = JSON.parse(coolio[i]);
                    img.src= item.value.itemPicture;
                    desc.text = item.value.itemDescription;
                    name.text = item.value.itemName;
                })
                .catch(function (e) {
                    console.log(e.message);
                });
            }   
        });

    }
    else {
        frameModule.topmost().navigate({ moduleName: "test"});
    }
};

// Navigate to profile module
exports.profilePage = function(args) {
    const topFrame = frameModule.topmost();
    const navEntry = {
        moduleName: "profile",
        context: user
    };
    topFrame.navigate(navEntry);
}

// Navigate to chat module
exports.chatPage = function(args) {
    const topFrame = frameModule.topmost();
    const navEntry = {
        moduleName: "chat",
        context: user        
    };
    topFrame.navigate(navEntry);
}

