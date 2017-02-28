var keystone = require('keystone'),
	Types = keystone.Field.Types;
var mongoose = require('keystone/node_modules/mongoose');
	

/**
 * Custom User Limits for Questions Model
 * ==========
 */

var QuestionLimit = new keystone.List('QuestionLimit', {
	track: true,
});

QuestionLimit.add({
	patient: { type: Types.Relationship, ref: 'Patient', initial: true, required: true, noedit: true, index: true },
	question: { type: Types.Relationship, ref: 'Question', initial: true, required: true, noedit: true, index: true  },
	low_green: { type: Types.Number, label: 'Low Safe'},
	high_green: { type: Types.Number, label: 'High Safe' },
	low_yellow: { type: Types.Number, label: 'Low Warning' },
	high_yellow: { type: Types.Number, label: 'High Warning' },
	evaluate: { type: Types.Boolean, label: 'Evaluate Limit', initial: true }
});

QuestionLimit.schema.methods.checkStatus = function(value) {
	if (!(this.evaluate) || value == undefined || value == null || isNaN(value) || 
		(this.high_yellow == undefined && this.low_yellow == undefined
		&& this.high_green == undefined && this.low_green == undefined)) {
		return null;
	}
	if (!(this.high_yellow == undefined) && (value > this.high_yellow)) {
		return "danger";
	}
	if (!(this.low_yellow == undefined) && (value < this.low_yellow)) {
		return "danger";
	}
	if (!(this.high_green == undefined) && (value > this.high_green)) {
		return "warning";
	}
	if (!(this.low_green == undefined) && (value < this.low_green)) {
		return "warning";
	}
	return "safe";
		
};

/**
 * Registration
 */

QuestionLimit.defaultColumns = 'patient, question, evaluate';
QuestionLimit.register();
