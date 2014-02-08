define( ['PostBoard', 'underscore', 'backbone'], function ( PostBoard, _, Backbone ) {
	PostBoard.Models.PostItGroup = Backbone.Model.extend({
		defaults: { 
			header: '',
			id: Date.now().toString()
		},
		initialize: function(){
			this.collection = new Backbone.Collection.extend({
				model: PostBoard.Models.PostIt
			})			
		}
	})

	return PostBoard.Models.PostItGroup
})