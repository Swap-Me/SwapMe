var observableModule = require('data/observable'),
    pageData = new observableModule.Observable(),
    myDataArray = [
	    {image:'https://images-na.ssl-images-amazon.com/images/I/71nA9hJYfDL._SX522_.jpg', height:'400px'},
	    {image:'https://images-na.ssl-images-amazon.com/images/I/61SdjbaQ2qL._SL1500_.jpg'},
	    {image:'https://images-na.ssl-images-amazon.com/images/I/51PvawibWLL.jpg'},
	    {image:'https://images-na.ssl-images-amazon.com/images/I/815Ut5G8xML._SL1500_.jpg'}
    ];

var frameModule = require("ui/frame");

pageData.set('myDataArray', myDataArray);
var yo = pageData.bindingContext;
console.log(yo);

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

 exports.profilePage = function(args) {
    const topFrame = frameModule.topmost();
    const navEntry = {
        moduleName: "profile"
    };
    topFrame.navigate(navEntry);
 }

 exports.chatPage = function(args) {
    const topFrame = frameModule.topmost();
    const navEntry = {
        moduleName: "chat"
    };
    topFrame.navigate(navEntry);
 }
