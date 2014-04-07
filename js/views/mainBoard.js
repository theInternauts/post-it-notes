define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.MainBoard = Backbone.View.extend({
		attributes: { 
			class: 'board'
		},
		defaultPosition: {
			top: 70,
			left: 20
		},
		events: {
	    	'dblclick': 'addPostItHandler'
		},		
		initialize: function(){
			this.toolbar = new PostBoard.Views.Toolbar()
			this.allGroupModels = new PostBoard.Collections.PostItCollection()
			this.allGroupViews = {}
			this.allPostModels = new PostBoard.Collections.PostItCollection()
			this.allPostViews = {}
			this.allGroupModels.on('add', this.addNewGroup, this)			
			this.allGroupModels.on('remove', this.removeNewGroup, this)			
			this.allPostModels.on('add', this.addPostIt, this)
			this.allPostModels.on('remove', this.removePostIt, this)
			PostBoard.Events.on('toolbar:groupAdd', this.addNewGroupHandler, this)
			PostBoard.Events.on('group:postItAdded', this.removeDroppedPostItModel, this)
		},
		render: function(){
			// this.setElement('html')
			this.$el.attr(this.attributes)
			this.$el.append(this.toolbar.render().el)
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
			this.$el.append(newView.render().$el.css(post_model.get('position')).attr('id',post_model.get('id')).draggable({ handle: '.header-label' }))
			return this
		},
		removePostIt: function(post_model){
			var id = post_model.get('id')
			console.log('#' + id)
			this.$('#' + id).draggable('destroy')
			this.allPostViews[id].remove()
			//possible bug in next line when a post is handed over to a group. 
			//Does this delete the object? Or simply remove its listing from the object allPostViews?
			delete this.allPostViews[id]
		},
		addNewGroupHandler: function(event){
			event.stopPropagation()
			this.allGroupModels.add(new PostBoard.Models.PostIt({ id: 'group_' + event.timeStamp.toString(), position: this.defaultPosition }))
		},
		addNewGroup: function(group_model){
			var group_model = group_model
			!group_model.get('id') ? group_model.set('id', Date.now().toString()) : null
			!group_model.get('position') ? group_model.set('position', this.defaultPosition) : null
			var newView = new PostBoard.Views.PostItGroupView({ model: group_model, collection: this.allGroupModels })
			this.allGroupViews[group_model.get('id')] = newView;
			this.$el.append(newView.render().$el.css(group_model.get('position')).attr('id',group_model.get('id')).draggable({ handle: '.header-label' }))
			return this
		},
		removeNewGroup: function(group_model){
			var id = group_model.get('id')
			console.log('#'+ id)
			this.$('#'+id).draggable('destroy')
			this.allGroupViews[id].remove()
			//Does this delete the object? Or simply remove its listing from the object allGroupViews allowing it to be referenced elsewhere (or garbage collected if it has been orphanded)?
			delete this.allGroupViews[id]
		},
		removeDroppedPostItModel: function(data){
			var dropped_model = this.allPostModels.get(data.pid)
			this.allPostModels.remove(dropped_model, { silent: true })
			//this.allPostViews[data.pid].remove()
			delete this.allPostViews[data.pid]
			PostBoard.Events.trigger('group:postItReleased', { gid: data.gid, model: dropped_model })			
		}
	})

	return PostBoard.Views.MainBoard
})