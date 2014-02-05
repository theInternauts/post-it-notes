define( ['PostBoard', 'underscore', 'backbone', 'models/postIt'], function ( PostBoard, _, Backbone, postIt ) {
	PostBoard.Models.PostIt = postIt
	PostBoard.Collections.PostItCollection = Backbone.Collection.extend({
		model: PostBoard.Models.PostIt
	})

	return PostBoard.Collections.PostItCollection
})