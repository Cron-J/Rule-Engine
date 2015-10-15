"use strict";

module.exports = function(sequelize, DataTypes) {
  var ClassgrpShortDescription = sequelize.define("ClassgrpShortDescription", {
    language: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        ClassgrpShortDescription.belongsTo(models.ClassificationGroup);
        }
    }
  });

  return ClassgrpShortDescription;
};
