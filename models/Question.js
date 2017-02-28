var keystone = require('keystone'),
	Types = keystone.Field.Types;
var mongoose = require('keystone/node_modules/mongoose');
	

/**
 * Question Model
 * ==========
 */

var Question = new keystone.List('Question', {
	track: true,
	autokey: { path: 'label_id', from: 'label', unique: true },
	map: {name: 'label'},
	searchFields: 'label, question'
});

Question.add({
	label: { type: Types.Key, required: true, initial: true, index: {unique: true}, noedit: true },
	question: { type: Types.Text, required: true, initial: true },
	low_green: { type: Types.Number, label: 'Low Safe'},
	high_green: { type: Types.Number, label: 'High Safe' },
	low_yellow: { type: Types.Number, label: 'Low Warning' },
	high_yellow: { type: Types.Number, label: 'High Warning' }
});

Question.schema.methods.checkStatus = function(value) {
	if (value == undefined || value == null || isNaN(value) || 
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

Question.defaultColumns = 'label, question';
Question.register();
