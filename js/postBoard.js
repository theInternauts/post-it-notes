var PostBoard = { Models: {}, Views: {}, Collections: {}, Helpers: {} };

//Models
PostBoard.Models.PostIt = Backbone.Model.extend({})

//Collections
PostBoard.Collections.PostItCollection = Backbone.Collection.extend({
	model: PostBoard.Models.PostIt
})

//Views
PostBoard.Views.Toolbar = Backbone.View.extend({
	attributes: { id: 'main-toolbar' },
	template: _.template('<ul><li><a href="#" id="btn-new-group">Create Group</a></li></ul>'),
	render: function () {
	    this.$el.html(this.template(this.model))
		return this
	},
	events: {
    	'dblclick ul': 'test'
	}	
})

PostBoard.Views.PostItView = Backbone.View.extend({
	attributes: { 
		class: 'post-it',
		style: 'display:block'
	},
	template: _.template('<div class=><div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content" contenteditable="true"><%= get("content") %></div>'),
	render: function () {
	    this.$el.html(this.template(this.model))
		return this
	},
	updatePostFromModel: function(post_model){
		this.$('.header-label').text(post_model.get('header'))
		this.$('.content').html(post_model.get('content'))
		this.$el.css(post_model.get('position'))
	},
	events: {
		'click .content' : 'setFocus',
		'click .header-label' : 'setFocus',
		'blur .content' : 'updatePostHandler',
		'blur .header-label' : 'updatePostHandler',
    	'dragstop': 'updatePostPositionHandler',
    	'click .header a': 'removePostItHandler'
	},	
	initialize: function(){
		console.log(this.model.get('id'))
		this.model.on('change', this.updatePostFromModel, this)
	},
	setFocus: function(event){
		event.stopPropagation()
		this.$(event.target).focus()
	},
	updatePostHandler: function(event){
		var targetID = $(event.target).parents('.post-it').attr('id')
		var headerText = this.$('.header-label').text()
		var contentText = this.$('.content').html()
		// var targetView = this.allPostViews[targetID.toString()]
		this.model.set('header', headerText)
		this.model.set('content', contentText)
	},
	updatePostPositionHandler: function(event){
		var target = $(event.target)
		newPosition = {}
		newPosition.top = target.cssUnit('top')[0]
		newPosition.left = target.cssUnit('left')[0]
		var targetID = target.attr('id')
		// var targetView = this.allPostViews[targetID.toString()]
		this.model.set('position', newPosition)
	},
	removePostItHandler: function(event){
		event.stopPropagation()
		var targetID = $(event.target).parents('.post-it').attr('id')
		targets = this.collection.where({ id: targetID })
		this.collection.remove(targets)
	}
})

PostBoard.Views.MainBoard = Backbone.View.extend({
	events: {
    	'click body': 'addPostItHandler'
	},
	defaultPosition: {
		top: 50,
		left: 50
	},
	render: function(){
		this.setElement('html')
		this.$('body').attr('id', 'board')
		this.$('body').append(new PostBoard.Views.Toolbar().render().el)
		return this
	},
	addPostItHandler: function(event){
		event.stopPropagation()
		var position = { top: event.pageY, left: event.pageX }
    	this.allPostModels.add(new PostBoard.Models.PostIt({ id: event.timeStamp.toString(), position: position }))
	},
	addPostIt: function(post_model){
		var post_model = post_model
		!post_model.get('id') ? post_model.set('id', Date.now().toString()) : null
		!post_model.get('position') ? post_model.set('position', this.defaultPosition) : null
		var newView = new PostBoard.Views.PostItView({ model: post_model, collection: this.allPostModels })
		this.allPostViews[post_model.get('id')] = newView;
		this.$('body').append(newView.render().$el.css(post_model.get('position')).attr('id',post_model.get('id')).draggable({ handle: '.header-label' }))
		return this
	},
	removePostIt: function(post_model){
		var id = post_model.get('id')
		console.log('#'+ id)
		this.$('#'+id).draggable('destroy')
		this.allPostViews[id].remove()
		delete this.allPostViews[id]
	},
	initialize: function(){
		this.allPostModels = new PostBoard.Collections.PostItCollection()
		this.allPostViews = {}
		this.$('body').on('click', this.addPostItHandler)
		this.allPostModels.on('add', this.addPostIt, this)
		this.allPostModels.on('remove', this.removePostIt, this)
	}
})