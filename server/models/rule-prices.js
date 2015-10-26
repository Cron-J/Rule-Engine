"use strict";

module.exports = function(sequelize, DataTypes) {
  var prices = sequelize.define("prices", {
    contractId: {
      type: DataTypes.STRING
    },
    statusId: {
      type: DataTypes.STRING
    },
    currencyId: {
      type: DataTypes.STRING
    },
    priceTypeId: DataTypes.STRING,
    mfgProductName: DataTypes.STRING,
    
    unitOfMeasureId: {
      type: DataTypes.STRING
    },    

    productIdExtensionForUoM: {
      type: DataTypes.STRING
    },
    
    netPrice: {
      type:DataTypes.INTEGER
    },
    
    validFromQuantity: {
      type: DataTypes.INTEGER
    },
    
    priceUnit: {
      type: DataTypes.INTEGER
    },
    
    vatPercentage: {
      type: DataTypes.INTEGER
    },
    
    description: {
      type: DataTypes.STRING
    },
    isPreferred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
        prices.belongsTo(models.product);
        }
    }
  });

  return prices;
};