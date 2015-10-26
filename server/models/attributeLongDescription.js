"use strict";

module.exports = function(sequelize, DataTypes){
	var attributelongdescription = sequelize.define("attributelongdescription",{
		language: DataTypes.STRING,
		/**
            Long Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), 
            space and maximum 100 characters.
             Long description. Contains full description.
        */
		description: {
			type: DataTypes.STRING,
			validate: {
			  is: {
			  	args: ["[a-zA-Z0-9_-\s]",'i'],
			  	msg: "Long Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), space."
			  },
			  len:[0,500]
			}
		}
	},{
		classMethods: {
			associate: function(models){
				attributelongdescription.belongsTo(models.attribute);
			}
		}
	});

	return attributelongdescription;
}