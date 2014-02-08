define( ['PostBoard', 'underscore', 'backbone', 'models/postItGroup'], function ( PostBoard, _, Backbone, postItGroup ) {
	PostBoard.Models.PostItGroup = postItGroup
	PostBoard.Collections.PostItGroupCollection = Backbone.Collection.extend({
		model: PostBoard.Models.PostIt
	})

	return PostBoard.Collections.PostItGroupCollection
})