var observableModule = require('data/observable'),
    // colorModule = require('color'),
    // color = colorModule.Color,
    // myCarousel = null,
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

// exports.myChangeEvent = function(args){
//     var changeEventText = 'Page changed to index: ' + args.index;
//     pageData.set('changeEventText', changeEventText);
// }

// exports.mySelectedEvent = function(args){
//     var tappedViewText = 'Tapped index: ' + args.index;
//     pageData.set('tappedViewText', tappedViewText);
// }
// var indicatorEnabled = true;
// exports.toggleIndicator = function(args){
//     if(!myCarousel) return;
//     myCarousel.showIndicator = !indicatorEnabled;
//     indicatorEnabled = !indicatorEnabled;
// }
// exports.toggleColor = function(args){
//     if(!myCarousel) return;
//     myCarousel.indicatorColor = '#00B8EB';
//     myCarousel.indicatorColorUnselected = '#50FED700';
// }
