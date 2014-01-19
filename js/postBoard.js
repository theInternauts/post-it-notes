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
	},
	test: function(event){ console.log("testing: ", event)}
	
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
	}
})

PostBoard.Views.MainBoard = Backbone.View.extend({
	events: {
    	'click body': 'addPostItHandler'
	},
	render: function(){
		this.setElement('html')
		this.$('body').attr('id', 'board')
		this.$('body').append(new PostBoard.Views.Toolbar().render().el)
		return this
	},
	addPostItHandler: function(event){
		var position = { top: event.pageY, left: event.pageX };
    	console.log(event.timeStamp);
    	this.addPostIt({ id: event.timeStamp, position: position });
	},
	addPostIt: function(post_data){
		var post_data = post_data
		!post_data.id ? post_data.id = Date.now() : null
		var newPost = new PostBoard.Models.PostIt(post_data)
		this.allPosts.add(newPost)
		this.$('body').append(new PostBoard.Views.PostItView({ model: newPost }).render().$el.css(newPost.get('position')).attr('id',newPost.get('id')))
		return newPost
	},
	initialize: function(){
		this.allPosts = new PostBoard.Collections.PostItCollection()
		this.$('body').on('click', this.addPostItHandler)
	}
})

