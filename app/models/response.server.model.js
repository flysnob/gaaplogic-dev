'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Response Schema
 */
var ResponseSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	projectId: {
		type: String,
		default: '',
		trim: true
	},
	questionId: {
		type: String,
		default: '',
		trim: true
	},
	type: {
		type: String,
		default: '',
		trim: true
	},
	question: {
		type: String,
		default: '',
		trim: true
	},
	response: {
		type: Schema.Types.Mixed,
		default: '',
		required: 'Please make a selection.'
	},
	sequence: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Response', ResponseSchema);