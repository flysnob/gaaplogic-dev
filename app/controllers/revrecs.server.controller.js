'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Revrec = mongoose.model('Revrec'),
	_ = require('lodash');

/**
 * Create a revrec
 */
exports.create = function(req, res) {
	var revrec = new Revrec(req.body);
	revrec.user = req.user;

	revrec.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(revrec);
		}
	});
};

/**
 * Show the current revrec
 */
exports.read = function(req, res) {
	res.json(req.revrec);
};

/**
 * Update a revrec
 */
exports.update = function(req, res) {
	var revrec = req.revrec;

	revrec = _.extend(revrec, req.body);

	revrec.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(revrec);
		}
	});
};

/**
 * Delete an revrec
 */
exports.delete = function(req, res) {
	var revrec = req.revrec;

	revrec.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(revrec);
		}
	});
};

/**
 * List of Revrecs
 */
exports.list = function(req, res) {
	Revrec.find().sort('-created').populate('user', 'displayName').exec(function(err, revrecs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(revrecs);
		}
	});
};

/**
 * Revrec middleware
 */
exports.revrecByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Revrec is invalid'
		});
	}

	Revrec.findById(id).populate('user', 'displayName').exec(function(err, revrec) {
		if (err) return next(err);
		if (!revrec) {
			return res.status(404).send({
				message: 'Revrec not found'
			});
		}
		req.revrec = revrec;
		next();
	});
};

/**
 * Revrec authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.revrec.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
