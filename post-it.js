var Board = function( selector ) {
  // Your board related code goes here
  
  // Use $elem to access the DOM element for this board
  var $elem = $( selector );
  
  function initialize() {
    // What needs to happen when this object is created?
  };

  initialize();
};

var PostIt = function() {
  // Your post-it related code goes here
};

$(function() {
  // This code will run when the DOM has finished loading
  Board.new('#board');
});