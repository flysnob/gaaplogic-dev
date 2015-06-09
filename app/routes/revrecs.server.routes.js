'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	revrecs = require('../../app/controllers/revrecs.server.controller');

module.exports = function(app) {
	// Revrec Routes
	app.route('/revrecs')
		.get(revrecs.list)
		.post(users.requiresLogin, revrecs.create);

	app.route('/revrecs/:revrecId')
		.get(revrecs.read)
		.put(users.requiresLogin, revrecs.hasAuthorization, revrecs.update)
		.delete(users.requiresLogin, revrecs.hasAuthorization, revrecs.delete);

	// Finish by binding the revrec middleware
	app.param('revrecId', revrecs.revrecByID);
};
