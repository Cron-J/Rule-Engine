"use strict";

module.exports = function(sequelize, DataTypes) {
  var ClassgrpLongDescription = sequelize.define("ClassgrpLongDescription", {
    language: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        ClassgrpLongDescription.belongsTo(models.ClassificationGroup);
        }
    }
  });

  return ClassgrpLongDescription;
};
