define( [ 'PostBoard', 'jquery', 'underscore', 'backbone', 'collections/postItCollection', 'views/postItView', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	PostBoard.Views.PostItGroupView = Backbone.View.extend({
		attributes: {
			class: 'post-it-group',
			style: 'display:block;position:absolute;'
		},
		events: {
			'click .header-label' : 'setFocus',
			'blur .header-label' : 'updateGroupHandler',
			'dragstop': 'updateGroupPositionHandler',
			'click .header a': 'removePostGroupItHandler'
		},
		template: _.template('<div class="header"><a>x</a><div class="header-label" contenteditable="true"><%= get("header") %></div></div><div class="content"></div>'),
		render: function () {
			this.$el.empty()
		    this.$el.html(this.template(this.model))
		    this.$el.children('.content').droppable({
		    	accept: '.post-it',
		    	snap: 'div',
		    	snapMode: 'inner',
		    	drop: this.postItDropHandler
		    })
			return this
		},
		setFocus: function(event){
			event.stopPropagation()
			this.$(event.target).focus()
		},
		updateGroupHandler: function(event){
			var headerText = this.$('.header-label').text()
			this.model.set('header', headerText)
		},
		updateGroupFromModel: function(group_model){
			this.$('.header-label').text(group_model.get('header'))
			this.$el.css(group_model.get('position'))
		},
		updateGroupPositionHandler: function(event){
			var target = $(event.target)
			if(target.hasClass('post-it-group')){
				var newPosition = {}
				newPosition.top = target.cssUnit('top')[0]
				newPosition.left = target.cssUnit('left')[0]
				var targetID = target.attr('id')
				this.model.set('position', newPosition)				
			}
		},
		removePostGroupItHandler: function(event){
			event.stopPropagation()
			var targetID = $(event.target).parents('.post-it-group').attr('id')
			this.collection.reset()
			PostBoard.Events.trigger('group:broadcastingDestroy', { gid: targetID, view: this })
		},
		postItDropHandler: function(event, ui){
			//'this' in this scope is a DOM element NOT the VIEW
			var ui_node = ui.draggable
			ui_node.css({ 'position':'static', 'margin':'0 auto 10px auto' })
	  		$(event.target).append(ui_node)
	  		var gid = $(event.target).parents('.post-it-group').attr('id')
	  		var pid = ui_node.attr('id')
	  		var response = { pid: pid, gid: gid }
	  		PostBoard.Events.trigger('group:postItAdded', response)
	  	},
	  	postItDropUpdate: function(data){
	  		if(this.model.get('id') == data.gid){
		  		this.collection.add(data.view.model)
	  		}
	  	},
	  	initialize: function(){
	  		console.log("group: " + this.model.get('id'))
	  		!this.collection ? this.collection = new PostBoard.Collections.PostItCollection() : null
			this.model.on('change', this.updateGroupFromModel, this)
	  		PostBoard.Events.on('group:broadcastingPostIt', this.postItDropUpdate, this)
	  	}
	})

	return PostBoard.Views.PostItGroupView
})