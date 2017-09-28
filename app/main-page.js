var frameModule = require("ui/frame");
var imageModule = require("ui/image");

/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

function pageLoaded(args) {
	var image1 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/05.jpg";
	var image2 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/06.jpg";
	var image3 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/07.jpg";
    var image4 = "https://raw.githubusercontent.com/NativeScript/sample-PhotoAlbum/master/app/res/08.jpg";
	var myImages = [image1, image2, image3, image4];
}
exports.pageLoaded = pageLoaded;

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

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = createViewModel();
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