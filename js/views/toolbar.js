define( ['PostBoard', 'backbone'], function ( PostBoard, Backbone ) {
	PostBoard.Views.Toolbar = Backbone.View.extend({
		attributes: { id: 'main-toolbar' },
		template: _.template('<ul><li><a href="#" id="btn-new-group">Create Group</a></li></ul>'),
		render: function () {
		    this.$el.html(this.template(this.model))
			return this
		},
		events: {
	    	'click ul a#btn-new-group': 'addGroupHandler',
	    	'click' : 'stopEventBubble'
		},
		addGroupHandler: function (e) {
			e.stopPropagation()
			PostBoard.Events.trigger('toolbar:groupAdd', e)
		},
		stopEventBubble: function(e){
			e.stopPropagation();
		}
	})

	return PostBoard.Views.Toolbar
})