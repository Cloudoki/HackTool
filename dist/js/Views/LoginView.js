define(['Views/BaseView'], function(BaseView){

	var LoginView = BaseView.extend({

		initialize: function(){

			if( window.localStorage.getItem('code') ){
				Hacktool.Router.navigate('home', true);
				return;
			}

		},

		render: function () {

			this.$el.html('<a href="https://www.github.com/login/oauth/authorize?client_id=55d515edbc303bfeaabe&scope=gist">Get it</a>');

			return this; 
		}

	});

	return LoginView;

});