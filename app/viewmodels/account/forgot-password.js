(function (global) {
    var Modal,
    	service,
        app = global.app = global.app || {};

    Model = function () {
        return kendo.observable({
        	email: '',
        	send: function () {
                var that = this;

    			app.application.showLoading();
    		
    			var attrs, req;
    			attrs = {
    				'data': {
    					'email': this.get('email'),
    				},
    				'dataType': 'json'
    			};

    			req = $.post(
    				app.remoteHostSSL + '/api/user/forgot-password', 
    				attrs.data,
                    null,
                    attrs.dataType
    			);
    			req.done(app.setToken).done(function(resp) {
    				app.application.hideLoading();
    				if (resp.success) {
                        app.alert("Password Reset", resp.message);
                        // go to request
                        app.application.navigate(app.pages.loggedOut);
    				} else {
                        app.alert("Password Reset Failed", resp.message);
    				}
    			});
        	}
    	});
    };

    service = app.accountForgotPasswordService = {
        beforeShow: function (e) {
            if (app.isLoggedIn()) {
                e.preventDefault();
                app.application.navigate(app.pages.loggedIn);
            }
        },
        viewModel: new Model()
    };
})(window);