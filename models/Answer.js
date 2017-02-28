var keystone = require('keystone'),
	Types = keystone.Field.Types;
var mongoose = require('keystone/node_modules/mongoose');	

/**
 * Answer Model
 * ==========
 */

var Answer = new keystone.List('Answer', {
 	track: true,
	map: { name: 'answer' },
	defaultSort: 'patient, question, -createdAt'
});

Answer.add({
	patient: { type: Types.Relationship, ref: 'Patient', initial: true, required: true, noedit: true, index: true },
	question: { type: Types.Relationship, ref: 'Question', initial: true, required: true, noedit: true, index: true  },
	answer: { type: Types.Number },
	date: {type: Date, index: true, required: true, initial: true, default: new Date() }
});

/**
 * Registration
 */

Answer.defaultColumns = 'patient, question, date, answer';
Answer.register();
