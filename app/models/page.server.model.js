'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Page Schema
 */
var PageSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	contentId: {
		type: String,
		default: '',
		trim: true
	},
	contentType: {
		type: String,
		default: '',
		trim: true
	},
	summary: {
		type: String,
		default: '',
		trim: true
	},
	reportSummary: {
		type: String,
		default: '',
		trim: true
	},
	help: {
		type: String,
		default: '',
		trim: true
	},
	faq: {
		type: String,
		default: '',
		trim: true
	},
	asc: {
		type: String,
		default: '',
		trim: true
	},
	examples: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Page', PageSchema);
