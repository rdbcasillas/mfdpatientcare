var keystone = require('keystone'),
	Types = keystone.Field.Types;
	

/**
 * Comment Model
 * ==========
 */

var Comment = new keystone.List('Comment', {
	track: true,
	map: { name: 'createdAt' },
	defaultSort: 'patient, -createdAt',
});

Comment.add({
	patient: { type: Types.Relationship, ref: 'Patient' },
	text: { type: Types.Textarea, height: 5 }
});


/**
 * Registration
 */

Comment.defaultColumns = 'patient, createdAt, text';
Comment.register();