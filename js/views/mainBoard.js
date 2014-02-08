define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	g = new PostBoard.Views.PostItGroupView()
	PostBoard.Views.MainBoard = Backbone.View.extend({
		events: {
	    	'click body': 'addPostItHandler'
		},
		defaultPosition: {
			top: 50,
			left: 50
		},
		render: function(){
			this.setElement('html')
			this.$('body').attr('id', 'board')
			this.$('body').append(this.toolbar.render().el)
			return this
		},
		addPostItHandler: function(event){
			event.stopPropagation()
			var position = { top: event.pageY, left: event.pageX }
	    	this.allPostModels.add(new PostBoard.Models.PostIt({ id: event.timeStamp.toString(), position: position }))
		},
		addPostIt: function(post_model){
			var post_model = post_model
			!post_model.get('id') ? post_model.set('id', Date.now().toString()) : null
			!post_model.get('position') ? post_model.set('position', this.defaultPosition) : null
			var newView = new PostBoard.Views.PostItView({ model: post_model, collection: this.allPostModels })
			this.allPostViews[post_model.get('id')] = newView;
			this.$('body').append(newView.render().$el.css(post_model.get('position')).attr('id',post_model.get('id')).draggable({ handle: '.header-label' }))
			return this
		},
		removePostIt: function(post_model){
			var id = post_model.get('id')
			console.log('#'+ id)
			this.$('#'+id).draggable('destroy')
			this.allPostViews[id].remove()
			delete this.allPostViews[id]
		},
		initialize: function(){
			this.toolbar = new PostBoard.Views.Toolbar()
			this.allPostModels = new PostBoard.Collections.PostItCollection()
			this.allPostGroupModels = new PostBoard.Collections.PostItGroupCollection()
			this.allPostViews = {}
			this.$('body').on('click', this.addPostItHandler)
			this.allPostModels.on('add', this.addPostIt, this)
			this.allPostModels.on('remove', this.removePostIt, this)
		}
	})

	return PostBoard.Views.MainBoard
})