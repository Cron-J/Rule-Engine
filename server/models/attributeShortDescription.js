"use strict";

module.exports = function(sequelize, DataTypes){
	var attributeshortdescription = sequelize.define("attributeshortdescription",{
		language: DataTypes.STRING,
		/**
            Short Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), space
            and maximum 20 characters.
            Short description. Shortly describes.
         */
		description: {
			type: DataTypes.STRING,
			validate: {
			  is: {
			  	args: ["[a-zA-Z0-9_-\s]",'i'],
			  	msg: "Short Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), space"
			  },
			  len:[0,200]
			}
		}
	},{
		classMethods: {
			associate: function(models){
				attributeshortdescription.belongsTo(models.attribute);
			}
		}
	});

	return attributeshortdescription;
}