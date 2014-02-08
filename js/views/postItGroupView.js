define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.PostItGroupView = Backbone.View.extend({
		attributes: { 
			class: 'post-it-group',
			style: 'display:block'
		},
		template: _.template('<div class=><div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content"><%= get("content") %></div>'),
		render: function () {
		    this.$el.html(this.template(this.model))
			return this
		},
		initialize: function () {
			this.collection = Backbone.Collection.extend({})			
		}		
	})
	
	return PostBoard.Views.PostItGroupView
})