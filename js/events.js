define( [ 'PostBoard', 'underscore', 'backbone'], function( PostBoard, _, Backbone ){
	PostBoard.Events = _.extend({}, Backbone.Events);

	return PostBoard.Events
})