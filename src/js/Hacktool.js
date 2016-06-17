
define(
	['Router', 'config', 'Models/User', 'Views/RootView', 'Session'],
	function (Router, config, User, RootView, Session)
	{
		var Moovly = {

			version : 1,

			init : function ()
			{
				// Load configs
				Moovly.Api = config.apiurl;
				Moovly.Session = Session;

				// Gallery page
				// locally
				//var regex = /^(http|https):\/\/platform.moovly.(\w+)\/#gallery\/user\/(\w+)/;
				//production
				var regex = /^(http|https):\/\/(www\.)?moovly.(\w+)\/platform\/#gallery\/user\/(\w+)/;
				var match = window.location.href.match(regex);

				// Authentication
				var token = window.localStorage.getItem('token');

				if (!token)
					if (!!match && match[1])	this.start();				// Gallery page requires no auth
					else						this.authenticate(token);

				else
					this.authenticate(token);

				return this;
			},

			authenticate: function(token) {
				// Check if there is authentication
				if(token && token.length > 9)
				{
					Moovly.Session.authenticationtoken = token;
					Backbone.accesstoken = token;

				} else{

					// Store the original uri to redirect to after auth
					localStorage.setItem('post_uri', window.location.href);

					window.location = window.location.pathname+"login.html";
					return false;
				}
				if(window.location.pathname == "/" && !token) {
					window.location = window.location.pathname+"login.html";
					return false;
				}

				this.Session.loadEssentialData (function ()	{
					var name = Moovly.Session.User.attributes.user.name,
						firstname = Moovly.Session.User.attributes.user.firstname,
						user_id = Moovly.Session.User.attributes.user.id;

					if (name)		localStorage.setItem('name', name);
					if (firstname)	localStorage.setItem('firstname', firstname);
					if (user_id)	localStorage.setItem('user_id', user_id);

					Moovly.start();
				});
			},

			start: function() {

				$('body').addClass('loaded').removeClass('loading');

				// Root view
				Moovly.RootView = new RootView();
				Moovly.RootView.renderNav();
				Moovly.RootView.renderFooter();
				// Router
				Moovly.Router = new Router ();

				Backbone.history.start();

				var url = Backbone.history.getFragment();
				var regex = 'project/editor';
				if(url.indexOf(regex) > -1) {
					Moovly.RootView.shutdownIntercom();
				} else {
					Moovly.RootView.runIntercom();
				}
				Moovly.checkRedirect();
				Moovly.legacyAuth();
			},

			// Checks of there should be a redirect to the page the user tried to visualize,
			// before logging in OR on password change restriction
			checkRedirect: function() {

				var uri = localStorage.getItem('post_uri'),
					token = Moovly.Session.authenticationtoken;
				if (Moovly.Session.User) {
					pwdexpired = Moovly.Session.User.attributes.user.password_expired;
				} else {
					pwdexpired = null;
				}
				var redirect_uri = localStorage.getItem('redirect_uri');
				
				// Password expired redirects to profile with warning
				if (pwdexpired) {
					Moovly.Session.addAlert('pwdexpired', true);
					Moovly.Router.navigate('#profile/account', true);
				} else if(redirect_uri && token && redirect_uri!=window.location.href ) {
					localStorage.removeItem('redirect_uri');
					window.location = redirect_uri;
				} else if (uri && token && uri!=window.location.href) {
					localStorage.removeItem('post_uri');
					window.location = uri;
				}

			},

			legacyAuth: function() {
				$.ajax({
					url: config.legacyurl + "api/login_token?bearer=" + Moovly.Session.authenticationtoken,
					xhrFields: {
						withCredentials: true
					},
					contentType:"application/json",
					dataType:"json"
				});
			}
		};

		Backbone.ajax = function() {
		    arguments[0].headers = {
		        'Authorization': Moovly.Session.authenticationtoken
		    };

		    return Backbone.$.ajax.apply(Backbone.$, arguments);
		};

		return Moovly;
	}
);
