define( ['PostBoard', 'backbone'], function ( PostBoard, Backbone ) {
	PostBoard.Views.Toolbar = Backbone.View.extend({
		attributes: { id: 'main-toolbar' },
		template: _.template('<ul><li><a href="#" id="btn-new-group">Create Group</a></li></ul>'),
		render: function () {
		    this.$el.html(this.template(this.model))
			return this
		},
		events: {
	    	'click ul': 'addNewGroup',
	    	'click' : 'stopEventBubble'
		},
		addNewGroup: function (e) {
			e.stopPropagation()
			this.trigger('addNewGroup', e)
		},
		stopEventBubble: function(e){
			e.stopPropagation();
		}
	})

	return PostBoard.Views.Toolbar
})