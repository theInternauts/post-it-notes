require.config({
	baseUrl: 'js',
	paths: {
		'underscore': 'vendor/underscore-min',
		'jquery': 'vendor/jquery.min',
		'backbone': 'vendor/backbone-min',
		'jquery-ui': 'vendor/jquery-ui',
		'PostBoard': 'postBoardNamespace'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone' : {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'jquery-ui': {
      deps: ['jquery']
    },
    'PostBoard': {
    	exports: 'PostBoard'
    }
	}
});

requirejs( ['PostBoard', 'jquery', 'underscore', 'backbone', 'events', 'models/postIt', 'collections/postItCollection', 'views/toolbar', 'views/postItView', 'views/postItGroupView', 'views/mainBoard', 'jquery-ui'], function( PostBoard, $, _, Backbone ){
	$(function() {
		b = new PostBoard.Views.MainBoard().render()
	})
})