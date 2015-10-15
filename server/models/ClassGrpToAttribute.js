"use strict";

module.exports = function(sequelize, DataTypes){
	var ClassGrpToAttribute = sequelize.define("ClassGrpToAttribute",{
		sortNo: DataTypes.INTEGER,
		grpId: DataTypes.STRING
	},{
		classMethods: {
			associate: function(models){
				ClassGrpToAttribute.belongsTo(models.Attribute);
				ClassGrpToAttribute.belongsTo(models.ClassificationGroup);
			}
		}
	});

	return ClassGrpToAttribute;
}