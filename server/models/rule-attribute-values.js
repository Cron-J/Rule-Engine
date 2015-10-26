"use strict";

module.exports = function(sequelize, DataTypes) {
  var attribute_values = sequelize.define("attribute_values", {
    statusId: {
      type: DataTypes.STRING
    },
    languageId: DataTypes.STRING,
    mfgProductName: DataTypes.STRING,
    
    attribute: {
      type: DataTypes.STRING
    },    

    value: {
      type: DataTypes.STRING
    },
    
    orderNo: {
      type:DataTypes.INTEGER
    },
    
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        attribute_values.belongsTo(models.product);
        }
    }
  }
  );

  return attribute_values;
};