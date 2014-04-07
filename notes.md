##Random stuf as a mental note to myself later.  
***These need to go into the Issues queue in Github***

main:	collection,add,remove,

group:	collection,add,remove,position,header,dimension,


the big questions:
*namspacing with Require.js?  //not sure I actually need this anymore.  Require does it for me?
*jquery-ui with require.js?   require( ['backbone', 'jquery', 'jquery-ui'], function( backbone, $ ){ })
* NOTE: [http://www.requirejs.org/jqueryui-amd/example/webapp/scripts/main.js] (http://www.requirejs.org/jqueryui-amd/example/webapp/scripts/main.js)



### A PostItGroup
	* it's own collection of PostIts
	* needs header
	* close button.
	* needs to be registered with the Mainboard
	* when a post is added need to remeber to change the internal 'collection' pointer
	* when a post leaves the board an even must be fired and picked up by the drop zone.




### Drop Zones:
	* mainboard
	* groups


## Future Issues:
	*consider relative positioning for posts and post groups instead of absolute
	* Will need to update the default position to help with placing new posts into a grid-y layout. I could let jQuery-UI handle the grid restrictions (and I'll get snap out of the deal)	
	* high level architecture question... Should the Mainboard track all posts and groups individually? OR should it only track what it contains? (i.e.  adding a post to a group hands over all knowledge and pointers of that post to the group and purges its internal collections/registry?). This may effect the ability to do massive operations on All posts; but could extend upper maximum of posts.  FOR NOW, the post is handed over completely to is new handling view (presumably a group)