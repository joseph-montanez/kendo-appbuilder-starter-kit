(function (global) {
	var app = global.app = global.app || {};
	
	app.isAuth = function (resp, cb) {
		console.log(resp);
		app.application.hideLoading();
		var defer = $.Deferred();
		if (resp.authenticated === false) {
			app.alert("Login Required", resp.error);
			app.application.navigate(app.pages.loggedOut);
			defer.reject(resp);
		} else {
			defer.resolve(resp);
		}
		
		return defer.promise();
	};
	
	app.isLoggedIn = function (e) {
		if (!app.session.loggedIn) {
			if (e != null) {
				e.preventDefault();
			}
			if (app.application != null && app.application.navigate != null) {
				app.application.navigate(app.pages.loggedOut);
			}
			return false;
		} else {
			return true;
		}
	};

	app.setToken = function (data, textStatus, jqXHR) {
		var defer = $.Deferred();
		if (data !== null && typeof data.token !== 'undefined') {
			app.session.token = data.token;
			// console.dir('<--  token: ' + data.token.substr(-10));
			app.saveSession();
		}
		defer.resolve(data);
		return defer.promise();
	};

	app.logOut = function (redirect) {
		var defer = $.Deferred();
		$.ajax({
			type: 'DELETE',
			dataType: 'json',
			url: app.remoteHost + '/api/user/logout'
		})
		.done(app.setToken)
		.done(function() {
			app.session = {};
			app.saveSession();
			if (redirect != null) {
				app.application.navigate(redirect);
			}
			defer.resolve();
		});

		return defer.promise();
	};
	
	app.loadSession = function() {
		var data, key, value, _results;
		if (typeof app.session === 'undefined') {
			app.session = {};
			data = localStorage.getItem('appdata');
			if (data !== null && data.length > 0) {
				data = JSON.parse(data);
				_results = [];
				for (key in data) {
					value = data[key];
					_results.push(app.session[key] = data[key]);
				}
				return _results;
			}
			
		}
	};
	
	app.saveSession = function() {
		var encodedSession = '';
		if (typeof this.session !== 'undefined') {
			encodedSession = JSON.stringify(this.session);
			return localStorage.setItem('appdata', encodedSession);
		}
	};

	app.debugSession = function () {
		$.ajax({
			url: app.remoteHost + '/api/test?token=' + app.session.token
		}).done(function (resp) {
			$('#debug-session').html(resp);
			console.log("DEBUG", resp);
		});
	};

	app.initRequestObject = function() {
		if (!this.session.token) {
			return false;
		}

		return {
			token: this.session.token
		};
	}

	app.alert = function (title, msg, fn, btns) {
		if (fn == null) {
			fn = function () {};
		}
		if (title == null) {
			title = "Alert";
		}
		if (typeof navigator.notification !== 'undefined' && typeof navigator.notification.alert !== 'undefined') {
			navigator.notification.alert(msg,
					fn, title, btns);
		} else {
			alert(msg);
			if (fn != null) {
				fn(1);
			}
		}
	};

	app.payload = function (obj) {
		return encodeURIComponent(JSON.stringify(obj));
	};
	
	app.getInitialView = function () {
		var initial = app.pages.loggedOut;
		if (app.isLoggedIn()) {
			var view = document.location.hash.replace(/#/, '');
			if ($.trim(view).length > 0) {
				initial = view
			} else {
				initial = app.pages.loggedIn;
			}
		}
		
		return initial;
	};

	$(document).ajaxError(function (event, jqxhr) {
		if (jqxhr && jqxhr.status === 401) {
			app.session = {};
			app.saveSession();
			app.application.navigate(app.pages.loggedOut);
		}
	});

	$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
		options.crossDomain = true;
		if (app.session.token) {
			jqXHR.setRequestHeader('X-Auth-Token', app.session.token || "");
		}
	});	
	
	$.ajaxSettings.ext = (function (anonymous) {
		return function ext(o){
			anonymous.prototype = this.data || {};
			var k, result = new anonymous;
			if (o) {
				if (typeof $.ajaxSettings.data === 'undefined') {
					$.ajaxSettings.data = {};
				}
				
				for(k in o) {
					$.ajaxSettings.data[k] = o[k];
				}
			}
			return result;
		};
	})(Function());
	
	$(document).ajaxSuccess(function(event, XMLHttpRequest, ajaxOptions) {
		var is_remote = ajaxOptions.url.indexOf(app.remoteHost) > -1;
		var data = null;
		var that = this;
		if (ajaxOptions.dataType === 'json' && is_remote) {
			try {
				var data = JSON.parse(XMLHttpRequest.responseText);
			} catch (e) {
				console.log(e);
			}
		}


		if (is_remote && typeof ajaxOptions.dataType !== 'undefined' && ajaxOptions.dataType === 'json') {
			//-- Server Error
			if (typeof data !== 'object') {
				alert('Sorry there something wrong with the server');
			}
		}
	});

	function onDeviceReady () {
		app.loadSession();

		$.ajax({
			dataType: 'json',
			url: app.remoteHost + '/auth'
		}).always(function (data, textStatus, errorThrown) {
			// console.log(data, textStatus, errorThrown);
			var initial = app.getInitialView();
			
			app.application = new kendo.mobile.Application(document.body, {
				layout: 'default-layout',
				initial: initial,
				skin: 'flat',
				statusBarStyle: 'black',
				init: function() {
					if (navigator.splashscreen != null) {
						navigator.splashscreen.hide();
					}
				}
			});
		});

		$(document.body).height(window.innerHeight);
		kendo.culture("en-US");
	};

	window.onload = function () {
		if (typeof document.ondeviceready !== 'undefined') {
			document.addEventListener("deviceready", onDeviceReady, false);
		} else {
			onDeviceReady();
		}
	};
})(window);