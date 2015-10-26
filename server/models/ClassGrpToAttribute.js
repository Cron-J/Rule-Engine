"use strict";

module.exports = function(sequelize, DataTypes){
	var classgrptoattribute = sequelize.define("classgrptoattribute",{
		sortNo: DataTypes.INTEGER,
		grpId: DataTypes.STRING
	},{
		classMethods: {
			associate: function(models){
				classgrptoattribute.belongsTo(models.attribute);
				classgrptoattribute.belongsTo(models.classificationgroup);
			}
		}
	});

	return classgrptoattribute;
}