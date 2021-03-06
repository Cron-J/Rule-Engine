"use strict";

module.exports = function(sequelize, DataTypes){
	var attributesectiondescription = sequelize.define("attributesectiondescription",{
		language: {
				type: DataTypes.STRING
		},
		/**
            description. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ) and underscores ( _ )
            and space and maximum 500 characters.
        */
		description: {
          type: DataTypes.STRING,
          validate: {
						len: {
		            args: [0,500],
		            msg: "Attribute Section Description length should between 0 and 500"
		        }
        }
		}
	}
	,{
		classMethods: {
			associate: function(models){
				attributesectiondescription.belongsTo(models.attributesection);
			},
		}
	});

	return attributesectiondescription;
}
