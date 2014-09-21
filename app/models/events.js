(function (global) {
    var EventsModel,
        app = global.app = global.app || {};
    EventsModel = kendo.data.Model.define({
        events: [],
        getDayEvents: function (/* Date */ date, /* Numeric */ group_id) {
            var start = moment(date);
            var end = moment(date);
            //-- Set start datetime to beginning of day
            start.hour(0).minute(0).second(0).millisecond(0);
            
            //-- Set end datetime to end of day
            end.hour(23).minute(59).second(59).millisecond(999);
            
            //-- Convert to UTC
            start.utc();
            end.utc();
            
            return $.ajax({
            	url: app.remoteHost + "/api/events/index",
                data: {
					start: start.format(app.dateTimeFormat),
					end: end.format(app.dateTimeFormat),
					groups_id: group_id
                },
                dataType: 'json'
            }).then(app.isAuth);
        }
    });
    
    app.EventsModel = EventsModel;
}(window));