'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	requirements_responses = require('../../app/controllers/requirements_responses.server.controller');

module.exports = function(app) {
	// Response Routes
	app.route('/requirements_responses')
		.get(requirements_responses.list)
		.post(users.requiresLogin, requirements_responses.create);

	app.route('/requirements_responses/:requirements_responseId')
		.get(requirements_responses.read)
		.put(users.requiresLogin, requirements_responses.hasAuthorization, requirements_responses.update)
		.delete(users.requiresLogin, requirements_responses.hasAuthorization, requirements_responses.delete);

	// Finish by binding the response middleware
	app.param('requirements_responseId', requirements_responses.requirements_responseByID);
};