define( ['PostBoard', 'underscore', 'backbone', 'models/postIt'], function ( PostBoard, _, Backbone, postIt ) {
	PostBoard.Collections.PostItCollection = Backbone.Collection.extend({
		model: postIt
	})

	return PostBoard.Collections.PostItCollection
})