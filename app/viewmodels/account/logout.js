(function (global) {
    var service,
        app = global.app = global.app || {};

    service = app.accountLogoutService = {
        beforeShow: function (e) {
        	app.logOut(app.pages.loggedOut);
        }
    };
})(window);
