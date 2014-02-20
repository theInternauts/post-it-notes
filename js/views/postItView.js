define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.PostItView = Backbone.View.extend({
		events: {
			'click .content' : 'setFocus',
			"click .header.header-label" : 'setFocus',
			'blur .content' : 'updatePostHandler',
			"blur .header.header-label" : 'updatePostHandler',
	    	'dragstop': 'updatePostPositionHandler',
	    	'click .header a': 'removePostItHandler'
		},
		attributes: {
			class: 'post-it',
			style: 'display:block;position:absolute;'
		},
		template: _.template('<div class="header"><a>x</a><div class="header header-label" contenteditable="true"><%= get("header") %></div></div><div class="content" contenteditable="true"><%= get("content") %></div>'),
		render: function () {
			this.$el.empty()
		    this.$el.html(this.template(this.model))
			return this
		},
		setFocus: function(event){
			console.log('post focus')
			event.stopPropagation()
			this.$(event.target).focus()
		},
		updatePostFromModel: function(post_model){
			this.$('.header-label').text(post_model.get('header'))
			this.$('.content').html(post_model.get('content'))
			this.$el.css(post_model.get('position'))
		},
		updatePostHandler: function(event){
			console.log('Post: ', this)
			my_post = this
			var headerText = this.$('.header-label').text()
			var contentText = this.$('.content').html()
			this.model.set('header', headerText)
			this.model.set('content', contentText)
		},
		updatePostPositionHandler: function(event){
			var target = $(event.target)
			var newPosition = {}
			newPosition.top = target.cssUnit('top')[0]
			newPosition.left = target.cssUnit('left')[0]
			var targetID = target.attr('id')
			this.model.set('position', newPosition)
		},
		removePostItHandler: function(event){
			event.stopPropagation()
			var targetID = $(event.target).parents('.post-it').attr('id')
			var targets = this.collection.where({ id: targetID })
			this.collection.remove(targets)
		},
		groupDropHandler: function(data){
			if (this.model.get('id') == data.pid){
				var response = { view: this }
				_.extend(response, data)
				PostBoard.Events.trigger('group:broadcastingPostIt', response)
			}
		},
		initialize: function(){
			console.log(this.model.get('id'))
			this.model.on('change', this.updatePostFromModel, this)
			PostBoard.Events.on('group:postItAdded', this.groupDropHandler, this)
		}
	})

	return PostBoard.Views.PostItView
})