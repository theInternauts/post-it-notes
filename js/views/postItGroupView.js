define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.PostItGroupView = Backbone.View.extend({
		attributes: { 
			class: 'post-it-group',
			style: 'display:block'
		},
		template: _.template('<div class=><div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content"><%= get("content") %></div>'),
		render: function () {
			//this will throw erros all day!
			//this.el.empty()
	    this.$el.html(this.template(this.model))
	    // var contentDIV = this.$('.content')
	    // _.each(this.allPostViews, function(view){
	    // 	contentDIV.append(view.el)
	    // })

			return this
		},
		updatePostFromModel: function(post_model){
			this.$('.header-label').text(post_model.get('header'))
			//this.$('.content').html(post_model.get('content'))
			this.$el.css(post_model.get('position'))		
		},
		events: {
			'click .header-label' : 'setFocus',
			'blur .header-label' : 'updatePostHandler',
    	'dragstop': 'updatePostPositionHandler',
    	'click .header a': 'removePostItHandler'
		},	
		initialize: function(){
			console.log(this.model.get('id'))
			this.allPostModels = new PostBoard.Collections.PostItCollection()
			//this.allPostViews = {}
			this.model.on('change', this.updatePostFromModel, this)
		},
		setFocus: function(event){
			event.stopPropagation()
			this.$(event.target).focus()
		},
		updatePostHandler: function(event){
			var targetID = $(event.target).parents('.post-it-group').attr('id')
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
			//TODO: add logic to delete each PostIt in this.allPostModels and purge the Views from this.allPostViews
			this.allPostModels.reset()
			var targetID = $(event.target).parents('.post-it-group').attr('id')
			targets = this.collection.where({ id: targetID })
			this.collection.remove(targets)
		}		
	})
	
	return PostBoard.Views.PostItGroupView
})