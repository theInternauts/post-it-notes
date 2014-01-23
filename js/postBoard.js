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
	},
	events: {
    	'dblclick ul': 'test'
	}
	
})

PostBoard.Views.PostItView = Backbone.View.extend({
	template: _.template('<div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content" contenteditable="true"><%= get("content") %></div>'),
	render: function () {
	    this.$el.html(this.template(this.model))
	    this.$el.attr({ 
	    	'class': 'post-it',
	    	'display': 'block'
		})
		return this
	},
	initialize: function(){
		console.log(this.model.get('id'))
	}
})

PostBoard.Views.MainBoard = Backbone.View.extend({
	events: {
    	'click body': 'addPostItHandler',
    	'click .post-it>.header': 'setFocus',
    	'click .post-it>.content': 'setFocus',
    	'click .post-it>.header>a': 'removePostItHandler'
	},
	render: function(){
		this.setElement('html')
		this.$('body').attr('id', 'board')
		this.$('body').append(new PostBoard.Views.Toolbar().render().el)
		return this
	},
	setFocus: function(event){
		event.stopPropagation()
		this.$(event.target).focus()		
	},
	addPostItHandler: function(event){
		event.stopPropagation()
		var position = { top: event.pageY, left: event.pageX };
    	this.addPostIt({ id: event.timeStamp.toString(), position: position });
	},
	addPostIt: function(post_data){
		var post_data = post_data
		!post_data.id ? post_data.id = Date.now().toString() : null
		var newPost = new PostBoard.Models.PostIt(post_data)
		this.allPosts.add(newPost)
		this.$('body').append(new PostBoard.Views.PostItView({ model: newPost }).render().$el.css(newPost.get('position')).attr('id',newPost.get('id')).draggable({ handle: '.header'}))
		return newPost
	},
	removePostItByID: function(id){
		console.log('#'+id)
		this.$('#'+id).draggable('destroy').remove()
		targets = this.allPosts.where({ id: id })
		this.allPosts.remove(targets)
	},
	removePostItHandler: function(event){
		event.stopPropagation()
		this.removePostItByID($(event.target).parents('.post-it').attr('id'))
	},
	initialize: function(){
		this.allPosts = new PostBoard.Collections.PostItCollection()
		this.$('body').on('click', this.addPostItHandler)
	}
})

my_item = null
