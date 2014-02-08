define( ['PostBoard', 'underscore', 'backbone'], function ( PostBoard, _, Backbone ) {
	PostBoard.Models.PostItGroup = Backbone.Model.extend({
		defaults: { 
			header: '',
			id: Date.now().toString(),
			position: {
				top: 50,
				left: 50
			},
			initialize: function(){
				this.collection = new Backbone.Collection.extend({
					model: PostBoard.Models.PostIt
				})			
			}
		}
	})

	return PostBoard.Models.PostItGroup
})