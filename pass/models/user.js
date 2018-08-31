'use strict';
const Bookshelf = require('../bookshelf');

module.exports = Bookshelf.model('User', {
	tableName: 'users',
	hasSecurePassword: true, //set true for default column name 'password_digest'
	hasTimestamps :['created_at', 'updated_at'],
	// hidden:['password'],
	// softDelete: true,

	//format data comming from database.
	parse: function(response){
		if(response.allowUseOfMyContactInformation != null)
			response.allowUseOfMyContactInformation = !!+response.allowUseOfMyContactInformation;
		return response;
	}

});