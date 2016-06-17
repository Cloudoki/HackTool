
define(
	['Router','Views/RootView'],
	function (Router, RootView)
	{
		var Hacktool = {

			version : 1,

			init : function ()
			{

				var code = window.localStorage.getItem('code');
				console.log( code );
				if ( code ){
					this.start();
				} else {
					this.redirect();
				}

				return this;
			},


			start: function() {

				$('body').addClass('loaded').removeClass('loading');

				// Root view
				Hacktool.RootView = new RootView();
				Hacktool.RootView.renderNav();
				Hacktool.RootView.renderFooter();
				// Router
				Hacktool.Router = new Router ();

				Backbone.history.start();

			},

			// Checks of there should be a redirect to the page the user tried to visualize,
			// before logging in OR on password change restriction
			redirect: function() {

				var uri = localStorage.getItem('post_uri');
				//var token = Hacktool.Session.authenticationtoken;
				
				//console.log(uri);

				/*if (Hacktool.Session.User) {
					pwdexpired = Hacktool.Session.User.attributes.user.password_expired;
				} else {
					pwdexpired = null;
				}
				var redirect_uri = localStorage.getItem('redirect_uri');
				
				// Password expired redirects to profile with warning
				if (pwdexpired) {
					Hacktool.Session.addAlert('pwdexpired', true);
					Hacktool.Router.navigate('#profile/account', true);
				} else if(redirect_uri && token && redirect_uri!=window.location.href ) {
					localStorage.removeItem('redirect_uri');
					window.location = redirect_uri;
				} else if (uri && token && uri!=window.location.href) {
					localStorage.removeItem('post_uri');
					window.location = uri;
				}*/

			}

		};


	return Hacktool;
	}
);
