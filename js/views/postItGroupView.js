define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.PostItGroupView = Backbone.View.extend({
		attributes: { 
			class: 'post-it-group',
			style: 'display:block'
		},
		template: _.template('<div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content"></div>'),
		render: function () {
		    this.$el.html(this.template(this.model))
			return this
		}		
	})
	
	return PostBoard.Views.PostItGroupView
})