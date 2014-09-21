(function (global) {
    var Model,
        service,
        app = global.app = global.app || {};

    Model = function () {
        return kendo.observable({
            isLoggedIn: false,
            email: "",
            password: "",

            onLogin: function (e) {
                if (e != null) {
                    e.preventDefault();
                }
                var that = this,
                    email = that.get("email").trim(),
                    password = that.get("password").trim();

                if (email === "" || password === "") {
                    app.alert("Login failed", "Both fields are required!");

                    return;
                }

                this.login(email, password);
            },

            onLogout: function () {
                this.clearForm();
                app.logOut();
            },

            clearForm: function () {
                var that = this;

                that.set("email", "");
                that.set("password", "");
            },

            checkEnter: function (e) {
                var that = this;

                if (e.keyCode == 13) {
                    $(e.target).blur();
                    that.onLogin();
                }
            },
            
            login: function (email, password) {
                var that = this;
    			//-- Loader
                //app.application.changeLoadingMessage('Attempting to log you in...');
    			app.application.showLoading();
    		
    			var attrs, req;
    			attrs = {
    				'data': {
    					'username': email,
    					'password': password
    				},
    				'dataType': 'json'
    			};
                
    			req = $.post(
    				app.remoteHostSSL + '/api/user/login', 
    				attrs.data,
                    null,
                    attrs.dataType
    			);
    			req.done(app.setToken).done(function(resp) {
    				app.application.hideLoading();
    				if (resp.token) {
                        app.session.loggedIn = true;
                        that.loggedIn = true;
                        app.saveSession();
                        
                        // go to request
                        app.application.navigate(app.pages.loggedIn);
    				} else {
                        app.alert("Login failed", "Invalid email or password entered.");
    				}
    			});
            },
            
    		getUUID: function(callback) {
    			var attrs, req;
    			attrs = {
    				'data': {},
    				'handleAs': 'json'
    			};
    			req = $.post(
    				app.remoteHost + '/api/get-uuid', 
    				attrs
    			);

    			return req.done(app.setToken).done(function(resp) {
                    app.session.token = resp.token;
    				app.saveSession();

                    return callback(resp);
    			});
    		},
    	});
    };

    service = app.accountLoginService = {
        beforeShow: function (e) {
            if (app.isLoggedIn()) {
                e.preventDefault();
                app.application.navigate(app.pages.loggedIn);
            }
        },
        show: function (e) {
            var viewModel = service.viewModel;
            
            if (app.session.loggedIn) {
                viewModel.set('isLoggedIn', true);
            } else {
                viewModel.set('isLoggedIn', false);
            }
        },
        viewModel: new Model()
    };
})(window);