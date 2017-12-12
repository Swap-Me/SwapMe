var observableModule = require("data/observable");

var user = new observableModule.fromObject({
    email: "user@domain.com",
    password: "password"
});

var frameModule = require("ui/frame");
var page;
var email;

exports.loaded = function(args) {
    page = args.object;    
    page.bindingContext = user;
    
};

exports.signIn = function() {
    email = page.getViewById("email");
    console.log(email.text);
};

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};

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