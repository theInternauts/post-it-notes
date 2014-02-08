define( ['PostBoard', 'underscore', 'backbone'], function ( PostBoard, _, Backbone ) {
	PostBoard.Models.PostItGroup = Backbone.Model.extend({
		defaults: { 
			'header': '',
			id: event.timeStamp.toString(),
			position: {
				top: 50,
				left: 50
			}
		}
	})

	return PostBoard.Models.PostItGroup
})