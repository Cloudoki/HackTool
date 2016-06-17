
define([],function ()
	{
		var Router = Backbone.Router.extend({

			routes: {

		        'home': 'home',
		        '*path': 'home'
		    },

		    home: function(){
		    	var view = new DashboardView();
		    	//Application.RootView.setView(view);
		    },

		    login: function(){
		    	var view = new DashboardView();
		    	Hacktool.RootView.setView(view);
		    }

		});

		return Router;
	}
);