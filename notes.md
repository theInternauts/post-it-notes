PostObject = { header: "", content: "", id: "", position: { top: "", left: "" } }

PostGroupObject = { name: "", list: [ ], id: "", position: { top: "", left: "" } }



Not sure how to model Groups yet -- a Group Model and another Collection?



Also don't forget to search for event Delegation in the PDF  (it's not what i want it to be :( )


main:	collection,add,remove,

group:	collection,add,remove,position,header,dimension,


the big questions:
namspacing with Require.js?  //not sure I actually need this anymore.  Require does it for me?
jquery-ui with require.js?   require( ['backbone', 'jquery', 'jquery-ui'], function( backbone, $ ){ })
NOTE: http://www.requirejs.org/jqueryui-amd/example/webapp/scripts/main.js



A PostItGroup
	* it's own collection of PostIts
	* needs header
	* close button.
	* needs to be registered with the Mainboard

	* when a post leaves the board an even must be fired and picked up by the drop zone.




Drop Zones:
	* mainboard
	* groups


Future Issues:
	* Will need to update the default position to help with palcing new posts into a grid-y layout. I could let jQuery-UI handle the grid restrictions (and I'll get snap out of the deal)	