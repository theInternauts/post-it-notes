define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'collections/postItCollection', 'views/postItView', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.PostItGroupView = Backbone.View.extend({
		attributes: {
			class: 'post-it-group',
			style: 'display:block;position:absolute;'
		},
		template: _.template('<div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content"></div>'),
		render: function () {
		    this.$el.html(this.template(this.model))
		    this.$el.children('.content').droppable({
		    	accept: '.post-it',
		    	snap: 'div',
		    	snapMode: 'inner',
		    	drop: this.postItDropHandler
		    })
			return this
		},
		postItDropHandler: function(event, ui){
			var ui_node = ui.draggable
			ui_node.css({ 'position':'static', 'margin':'0 auto 10px auto' })
	  		$(event.target).append(ui_node)
	  		PostBoard.Events.trigger('group:postItAdded', { id: ui_node.attr('id') })
	  	},
	  	postItDropUpdate: function(data){
	  		console.log("group:update: ", data.view.model)
	  		this.collection.add(data.view.model)
	  	},
	  	initialize: function(){
	  		!this.collection ? this.collection = new PostBoard.Collections.PostItCollection() : null
	  		var my_model = this.model
	  		// this.model.collection.on('add', this.addPostItViewToGroup, this)
	  		PostBoard.Events.on('group:broadcastingPostIt', this.postItDropUpdate, this)
	  	}
	})

	return PostBoard.Views.PostItGroupView
})