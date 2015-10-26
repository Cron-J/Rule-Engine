"use strict";

module.exports = function(sequelize, DataTypes) {
  var classgrplongdescription = sequelize.define("classgrplongdescription", {
    language: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        classgrplongdescription.belongsTo(models.classificationgroup);
        }
    }
  });

  return classgrplongdescription;
};
