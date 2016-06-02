NEWSCHEMA('Notification').make(function(schema) {

	schema.define('type', Number);                 // 0: info, 1: success, 1: alert
	schema.define('id', 'Url', true)               // Application's identificator
	schema.define('user', 'String(100)', true);    // User Token
	schema.define('body', 'String(5000)', true);   // Message
	schema.define('url', 'Url', true);             // Open URL in application iFrame
	schema.define('datecreated', Date);

	schema.setSave(function(error, model, controller, callback) {

		var app = APPLICATIONS.findItem('openplatform', model.id);
		if (!app) {
			error.push('error-application-notfound');
			return callback();
		}

		if (!app.notifications) {
			error.push('error-application-permissions');
			return callback();
		}

		if (app.origin && app.origin.length && app.origin.indexOf(controller.ip) === -1) {
			error.push('error-application-origin');
			return callback();
		}

		var user = USERS.findItem('id', model.user);
		if (!user) {
			error.push('error-user-notfound');
			return callback();
		}

		if (!user.applications[app.id]) {
			error.push('error-user-application');
			return callback();
		}

		// DONE
		var item = model.$clean();
		item.id = UID();

		OPENPLATFORM.users.create_notification(user, item);
		callback(SUCCESS(true, item.id));
	});
});