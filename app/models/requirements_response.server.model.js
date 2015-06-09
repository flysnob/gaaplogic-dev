'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Requirements_responses Schema
 */
var Requirements_responseSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	projectId: {
		type: String,
		default: ''
	},
	questionId: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: ''
	},
	question: {
		type: String,
		default: '',
		trim: true
	},
	answer: {
		type: Schema.Types.Mixed,
		default: '',
	},
	sequence: {
		type: String,
		default: ''
	},
	comment: {
		type: String,
		default: '',
		trim: true
	},
	conclusion: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Requirements_response', Requirements_responseSchema);