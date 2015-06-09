'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Requirements_response = mongoose.model('Requirements_response'),
	_ = require('lodash');

/**
 * Create a requirements_response
 */
exports.create = function(req, res) {
	var requirements_response = new Requirements_response(req.body);
	requirements_response.user = req.user;

	requirements_response.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(requirements_response);
		}
	});
};

/**
 * Show the current requirements_response
 */
exports.read = function(req, res) {
	res.json(req.requirements_response);
};

/**
 * Update a requirements_response
 */
exports.update = function(req, res) {
	var requirements_response = req.requirements_response;

	requirements_response = _.extend(requirements_response, req.body);

	requirements_response.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(requirements_response); // response?
		}
	});
};

/**
 * Delete a requirements_response
 */
exports.delete = function(req, res) {
	var requirements_response = req.requirements_response;

	requirements_response.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(requirements_response); // response?
		}
	});
};

/**
 * List of Responses
 */
exports.list = function(req, res) {
	Requirements_response.find().sort('-created').populate('user', 'displayName').exec(function(err, requirements_responses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(requirements_responses);
		}
	});
};

/**
 * Response middleware
 */
exports.requirements_responseByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Response is invalid'
		});
	}

	Requirements_response.findById(id).populate('user', 'displayName').exec(function(err, requirements_response) {
		if (err) return next(err);
		if (!requirements_response) {
			return res.status(404).send({
  				message: 'Response not found'
  			});
		}
		req.requirements_response = requirements_response;
		next();
	});
};

/**
 * Response authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.requirements_response.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};