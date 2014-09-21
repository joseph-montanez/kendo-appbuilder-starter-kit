(function (global) {
    var Model,
    	service,
        app = global.app = global.app || {};

    Model = function () {
        return kendo.observable({
        });
    };

    service = app.welcomeService = {
        init: function (e) {
        	console.log('init', e);
            var viewModel = service.viewModel;

            //-- Fast Click Content
            FastClick.attach(e.view.content[0]);
        },
        beforeShow: function (e) {
        	console.log('beforeShow', e);
        	//-- Protect View
        	return app.isLoggedIn(e);
        },
        beforeHide: function (e) {
        	console.log('beforeHide', e);
        },
        show: function (e) {
        	console.log('show', e);
            var viewModel = service.viewModel;
            var params = e.view.params;

        },
        afterShow: function (e) {
        	console.log('afterShow', e);
        },
        hide: function (e) {
        	console.log('hide', e);
            var viewModel = service.viewModel;
        },
        transitionStart: function (e) {
        	console.log('transitionStart', e);
        },
        transitionEnd: function (e) {
        	console.log('transitionEnd', e);
        },
        viewModel: new Model()
    };
})(window);