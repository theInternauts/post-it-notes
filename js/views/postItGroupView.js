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
			 ui_node = ui.draggable.css({ 'position':'static', 'margin':'0 auto 10px auto' })
	  		$(event.target).append(ui_node)
	  	},
	  	addPostItViewToGroup: function(post_model){
	  		console.log("ADD")
	  		var new_post = new PostBoard.Views.PostItView({ model: post_model})
	  		new_post.render().$el.css({ 'position':'static', 'margin':'0 auto 10px auto'})
	  		this.$el.append(new_post.el)
	  	},
	  	initialize: function(){
	  		// !this.collection ? this.collection = new PostBoard.Collections.PostItCollection() : null
	  		var my_model = this.model
	  		// this.model.collection.on('add', this.addPostItViewToGroup, this)
	  	}
	})

	return PostBoard.Views.PostItGroupView
})