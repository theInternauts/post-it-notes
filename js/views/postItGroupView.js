define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.PostItGroupView = Backbone.View.extend({
		attributes: { 
			class: 'post-it-group absolute',
			style: 'display:block'
		},
		template: _.template('<div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content"><%= get("content") %></div>'),
		render: function () {
			this.$el.empty()
	    this.$el.html(this.template(this.model))
	    this.$( ".content" ).droppable({ hoverClass: "drop-hover", tolerance: "pointer" });
	    var contentDIV = this.$('.content:first')
	    _.each(this.allPostViews, function(view){
	    	contentDIV.append(view.render().el)
	    })

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
    	'click .header a': 'removePostItHandler',
    	'drop .content' : 'dropHandler' 
		},	
		initialize: function(){
			console.log(this.model.get('id'))
			this.allPostModels = new PostBoard.Collections.PostItCollection()
			this.allPostViews = {}
			window.vl = this.allPostViews
			window.ml = this.allPostModels
			this.model.on('change', this.updatePostFromModel, this)
			this.allPostModels.on('add', this.renderPostIt, this)
			this.allPostModels.on('remove', this.popPostIt, this)
			this.allPostModels.on('reset', this.purgePostCollection, this)
			PostBoard.Events.on('group:postItReleased', this.pushPostIt, this)
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
			this.allPostModels.reset()
			var targetID = $(event.target).parents('.post-it-group').attr('id')
			targets = this.collection.where({ id: targetID })
			this.collection.remove(targets)
		},
		dropHandler: function(event,ui){
			var ui_node = ui.draggable
			ui_node.css({ 'position':'static', 'margin':'0 auto 10px auto' })
			//this is bad.  I probably need to re-create/re-render the view from the model that NEEDS TO BE passed from the previous part of the post
  		$(event.target).append(ui_node)
  		var gid = $(event.target).parents('.post-it-group').attr('id')
  		var pid = ui_node.attr('id')
  		var response = { pid: pid, gid: gid }
  		PostBoard.Events.trigger('group:postItAdded', response)

		},
		popPostIt: function(model){
			var model_id = model.get('id')
			this.allPostViews[model_id].remove()
			delete this.allPostViews[model_id]
			console.log('popped: #' + model_id + ' from: #group_' + this.model.get('id'))
		},
		pushPostIt: function(data){
			if(data.gid === this.model.get('id')){
				console.log("BINGO: ", data)
				this.allPostModels.add(data.model)
			}
		},
		renderPostIt: function(post_model){
			var post_model = post_model
			!post_model.get('id') ? post_model.set('id', Date.now().toString()) : null
			post_model.set('position', this.getContentPosition())
			var newView = new PostBoard.Views.PostItView({ model: post_model, collection: this.allPostModels, el: '#'+post_model.get('id') })
			this.allPostViews[post_model.get('id')] = newView;
			this.$('.content:first').append(newView.render().$el.removeClass('absolute').css(post_model.get('position')).attr('id',post_model.get('id')).draggable({ handle: '.header-label' }))
			return this
		},
		getContentPosition: function(){
			return { 'position':'static !important', 'margin':'0 auto 10px auto', 'top':'', 'left': '' }
		},
		purgePostCollection: function(models, options){
			that = this
			_.each(options.previousModels,function(model){
				that.popPostIt.call(that,model)
			})
		}
	})
	
	return PostBoard.Views.PostItGroupView
})