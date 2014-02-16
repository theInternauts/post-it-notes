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
			//'this' in this scope is a DOM element NOT the VIEW
			var ui_node = ui.draggable
			ui_node.css({ 'position':'static', 'margin':'0 auto 10px auto' })
	  		$(event.target).append(ui_node)
	  		var gid = $(event.target).parents('.post-it-group').attr('id')
	  		var pid = ui_node.attr('id')
	  		var response = { pid: pid, gid: gid }
	  		PostBoard.Events.trigger('group:postItAdded', response)
	  	},
	  	postItDropUpdate: function(data){
	  		if(this.model.get('id') == data.gid){
		  		console.log("group:update: ", data.view.model)
		  		this.collection.add(data.view.model)
	  		}
	  	},
	  	initialize: function(){
	  		!this.collection ? this.collection = new PostBoard.Collections.PostItCollection() : null
	  		my_model = this.model
	  		PostBoard.Events.on('group:broadcastingPostIt', this.postItDropUpdate, this)
	  	}
	})

	return PostBoard.Views.PostItGroupView
})