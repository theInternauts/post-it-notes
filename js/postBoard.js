var PostBoard = { Models: {}, Views: {}, Collections: {}, Helpers: {} };

//Models
PostBoard.Models.PostIt = Backbone.Model.extend({})

//Collections
PostBoard.Collections.PostItCollection = Backbone.Collection.extend({
	model: PostBoard.Models.PostIt
})

//Views
PostBoard.Views.Toolbar = Backbone.View.extend({
	template: _.template('<ul><li><a href="#" id="btn-new-group">Create Group</a></li></ul>'),
	render: function () {
	    this.$el.html(this.template(this.model))
	    this.$el.attr('id', 'main-toolbar')
		return this
	}
})

PostBoard.Views.PostItView = Backbone.View.extend({
	template: _.template('<div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content" contenteditable="true"><%= get("content") %></div>'),
	render: function () {
	    this.$el.html(this.template(this.model))
	    this.$el.attr({ 
	    	class: 'post-it',
	    	display: 'block'
		})
		return this
	}
})

PostBoard.Views.MainBoard = Backbone.View.extend({
	events: {
    	'click div.header': 'addPostIt'
	},
	render: function(){
		this.el = document.getElementsByTagName('body')
		this.$el = $('body')
		this.$el.attr('id', 'board')
		this.$el.append(new PostBoard.Views.Toolbar().render().el)
		// this.$el.appendTo('body')
		return this
	}
})

