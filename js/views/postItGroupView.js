define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
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
		    	snapMode: 'outer',
		    	drop: this.postItDropHandler
		    })
			return this
		},
		postItDropHandler: function(event, ui){
  		console.log(event, ui)
  		ui_node = ui.draggable.css({ 'position':'static', 'margin':'0 auto 10px auto'})
  		$(event.target).append(ui_node)
  	}
	})

	return PostBoard.Views.PostItGroupView
})