
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Home = BaseView.extend({
            
			events: {
				// SET EVENTS
			},

			initialize: function(options) {

				
			},

		    render: function() {	
		    	
       
		        return this;
		    },

		    fill: function(type, collection) {

		    	
		    },

		    showError: function() {

		    	this.renderAlert('.error-alert', 'danger', 'oooopppppsssss');
		    }
		});

		return Home;
	}
);