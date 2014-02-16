define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.MainBoard = Backbone.View.extend({
		events: {
	    	'click body': 'addPostItHandler'
		},
		defaultPosition: {
			top: 72,
			left: 20
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
			!post_model.get('position') ? post_model.set('position', this.defaultPosition) : null
			var newView = new PostBoard.Views.PostItView({ model: post_model, collection: this.allPostModels })
			this.allPostViews[post_model.get('id')] = newView
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
		addGroupHandler: function(event){
			event.stopPropagation()
			this.allPostGroupModels.add(new PostBoard.Models.PostItGroup({ 'header': '', id: event.timeStamp.toString(), position: this.defaultPosition }))
		},
		addPostItGroup: function(group_model){
			var group_model = group_model
			!group_model.get('position') ? group_model.set('position', this.defaultPosition) : null
			var newGroupView = new PostBoard.Views.PostItGroupView({ model: group_model })
			this.allGroupViews[group_model.get('id')] = newGroupView
			this.$('body').append(newGroupView.render().$el.css(group_model.get('position')).attr('id',group_model.get('id')).draggable({ handle: '.header-label' }))
		},
		removeDroppedPostItModel: function(data){
			this.allPostModels.remove(data.view.model, { silent: true })
		},
		initialize: function(){
			this.toolbar = new PostBoard.Views.Toolbar()
			this.allPostModels = new PostBoard.Collections.PostItCollection()
			this.allPostGroupModels = new PostBoard.Collections.PostItGroupCollection()
			this.allPostViews = {}
			this.allGroupViews = {}
			this.$('body').on('click', this.addPostItHandler)
			this.allPostModels.on('add', this.addPostIt, this)
			this.allPostModels.on('remove', this.removePostIt, this)
			PostBoard.Events.on('clickGroupAdd', this.addGroupHandler, this)
			this.allPostGroupModels.on('add', this.addPostItGroup, this)
			PostBoard.Events.on('group:broadcastingPostIt', this.removeDroppedPostItModel, this)
		}
	})

	return PostBoard.Views.MainBoard
})