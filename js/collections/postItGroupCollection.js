define( ['PostBoard', 'underscore', 'backbone', 'models/postItGroup'], function ( PostBoard, _, Backbone, postItGroup ) {
	PostBoard.Collections.PostItGroupCollection = Backbone.Collection.extend({
		model: postItGroup
	})

	return PostBoard.Collections.PostItGroupCollection
})