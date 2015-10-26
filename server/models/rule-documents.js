"use strict";

module.exports = function(sequelize, DataTypes) {
  var documents = sequelize.define("documents", {
    documentViewTypeId: {
      type: DataTypes.STRING
    },
    languageId: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    validFrom: {
      type: DataTypes.STRING
    },
    validTo: {
      type: DataTypes.STRING
    },
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        documents.belongsTo(models.product);
        }
    }
  }
  );

  return documents;
};