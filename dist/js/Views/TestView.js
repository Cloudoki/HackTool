define(['Views/BaseView'], function (BaseView) {
	
	var TestView = BaseView.extend({

		initialize: function () {
			console.log('test view');
		}



	});

	return TestView;

});