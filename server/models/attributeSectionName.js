"use strict";

module.exports = function(sequelize, DataTypes){
	var AttributeSectionName = sequelize.define("AttributeSectionName",{
		language: DataTypes.STRING,
		/**
            name. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ) and underscores ( _ )
            and space and maximum 200 characters.
        */
		name: {
			type: DataTypes.STRING,
			validate: {
			  is: {
            args: ["^[a-zA-Z0-9_-\s]+$",'i'],
            msg: "Attribute Section Name can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ) and underscores ( _ )."
			  },
				len: {
						args: [0,200],
						msg: "Attribute Section Description length should between 0 and 200"
				},
			}
		}
	},{
		classMethods: {
			associate: function(models){
				AttributeSectionName.belongsTo(models.AttributeSection);
			}
		}
	});

	return AttributeSectionName;
}
