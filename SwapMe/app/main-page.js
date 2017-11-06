var frameModule = require("ui/frame");
var imageModule = require("ui/image");
var Sqlite = require("nativescript-sqlite");
/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
var observableModule = require('data/observable'),
pageData = new observableModule.Observable(),
myDataArray = [
    {title:'Find cool and interesting items nearby', color: '#ffffff', image:'https://s3.amazonaws.com/swapmeimg/c1.png', height:'400px'},
    {title:'Swipe Right to like something or Swipe Left to pass', color: '#ffffff', image:'https://s3.amazonaws.com/swapmeimg/c2.png'},
    {title:'If they also Swipe Right, it\'s a Match!', color: '#ffffff', image:'https://s3.amazonaws.com/swapmeimg/c4.png'},
    {title:'Chat with people you\'ve matched with to meet up', color: '#ffffff', image:'https://s3.amazonaws.com/swapmeimg/c6.png'}
];

pageData.set('myDataArray', myDataArray);




/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/ 
var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    
    var page = args.object;
    
    (new Sqlite("my.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)").then(id => {
            page.bindingContext = createViewModel(db);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    //page.bindingContext = createViewModel();
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;

exports.carousel = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "carousel"
    };
    topmost.navigate(navigationEntry);
};

exports.register = function(args){
	var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "register"
    };
    topmost.navigate(navigationEntry);
};

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    myCarousel = page.getViewById('myCarousel');
    };
    
exports.myChangeEvent = function(args){
     var changeEventText = 'Page changed to index: ' + args.index;
     pageData.set('changeEventText', changeEventText);
    }
    
exports.mySelectedEvent = function(args){
     var tappedViewText = 'Tapped index: ' + args.index;
     pageData.set('tappedViewText', tappedViewText);
    }
    var indicatorEnabled = true;
exports.toggleIndicator = function(args){
     if(!myCarousel) return;
     myCarousel.showIndicator = !indicatorEnabled;
     indicatorEnabled = !indicatorEnabled;
    }
exports.toggleColor = function(args){
     if(!myCarousel) return;
     myCarousel.indicatorColor = '#00B8EB';
     myCarousel.indicatorColorUnselected = '#50FED700';
    }
    
exports.thirdAuth = function(args) {
    var topmost = frameModule.topmost(),
        navigationEntry = {
            moduleName: "login"
        };
      
    topmost.navigate(navigationEntry);
    };
    