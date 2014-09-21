(function (global) {
    var Model,
        service,
        app = global.app = global.app || {};

    Model = function () {
        return kendo.observable({
            email: "",
            password: "",
            errors: {
                email: false,
                password: false
            },
            
            onRegister: function (evt) {
                var that = this;
                //-- Loader
                app.application.showLoading();          
            
                var attrs, req;
                attrs = {
                    'data':  app.accountRegisterService.viewModel.toJSON(),
                    'dataType': 'json'
                };

                req = $.post(
                    app.remoteHostSSL + '/api/user/register', 
                    attrs.data,
                    null,
                    attrs.dataType
                );
                req.done(function(resp) {

                    app.accountRegisterService.viewModel.set('errors', resp.messages);
                    if (!resp.success) {
                        app.application.hideLoading();
                        for (var key in resp.messages) {
                            var viewNode = $('#accounts-register-view');
                            var elem = viewNode.find('[data-bind*="' + key + '"]');
                            var scroller = viewNode.getKendoMobileView().scroller;
                            scroller.scrollTo(0, -1 * elem.position().top);
                            break;
                        }
                        
                        app.alert("Registration failed", "Sorry looks like you have some errors, please review the form.", null, 'OK');
                        return;
                    }

                    //-- Log In User
                    app.accountLoginService.viewModel.login(attrs.data.email, attrs.data.password);
                });
            }
        });
    };

    service = app.accountRegisterService = {
        init: function (e) {
            var viewModel = service.viewModel;
            $(function() {
                FastClick.attach(e.view.container[0]);
            });
        },
        beforeShow: function (e) {
            console.dir(e);
            if (app.isLoggedIn()) {
                console.log(124);
                e.preventDefault();
                app.application.navigate(app.pages.loggedIn);
            }
        },
        show: function (e) {
            var viewModel = service.viewModel;
        },
        hide: function (e) {
            var viewModel = service.viewModel;
        },
        viewModel: new Model()
    };
})(window);