var observableModule = require('data/observable'),
    frameModule = require('ui/frame'),
    // tnsOAuthModule = require('nativescript-oauth'),
    pageData = new observableModule.Observable(),
    myDataArray = [
	    {title:'Find cool and interesting items nearby', color: '#ffffff', image:'https://s3.amazonaws.com/swapmeimg/c1.png', height:'400px'},
	    {title:'Swipe Right to like something or Swipe Left to pass', color: '#ffffff', image:'https://s3.amazonaws.com/swapmeimg/c2.png'},
	    {title:'If they also Swipe Right, it\'s a Match!', color: '#ffffff', image:'https://s3.amazonaws.com/swapmeimg/c4.png'},
	    {title:'Chat with people you\'ve matched with to meet up', color: '#ffffff', image:'https://s3.amazonaws.com/swapmeimg/c6.png'}
    ];

pageData.set('myDataArray', myDataArray);

exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = pageData;
  myCarousel = page.getViewById('myCarousel');
};

exports.thirdAuth = function(args) {
  var topmost = frameModule.topmost(),
      navigationEntry = {
        moduleName: "login"
      };

  topmost.navigate(navigationEntry);
};
