(function (global) {
    var app = global.app = global.app || {};

    app.remoteHost = "http://localhost:8000";
    app.remoteHostSSL = "http://localhost:8000";
    app.dateTimeFormat = "YYYY-MM-DD HH:mm:ss.SSS";
    app.dateFormat = "YYYY-MM-DD";
    app.timeFormat = "HH:mm";
    app.pages = {
    	loggedOut: 'views/account/login.html',
    	loggedIn: 'views/welcome.html'
    };
})(window);