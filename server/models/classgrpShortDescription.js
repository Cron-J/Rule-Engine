"use strict";

module.exports = function(sequelize, DataTypes) {
  var classgrpshortdescription = sequelize.define("classgrpshortdescription", {
    language: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        classgrpshortdescription.belongsTo(models.classificationgroup);
        }
    }
  });

  return classgrpshortdescription;
};
