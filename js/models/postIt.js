define( ['PostBoard', 'underscore', 'backbone'], function ( PostBoard, _, Backbone ) {
	PostBoard.Models.PostIt = Backbone.Model.extend({
		defaults: {
			header: '',
			id: Date.now().toString(),
			content: ''
		}
	})

	return PostBoard.Models.PostIt
})