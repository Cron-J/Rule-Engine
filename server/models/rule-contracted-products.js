"use strict";

module.exports = function(sequelize, DataTypes) {
  var contractedproducts = sequelize.define("contractedproducts", {
    statusId: {
      type: DataTypes.STRING
    },
    extProductId: {
      type: DataTypes.STRING
    },
    altExtProductId: {
      type: DataTypes.STRING
    },
    extClassificationId: {
      type: DataTypes.STRING
    },
    extClassificationGroupId: {
      type: DataTypes.STRING
    },
    extGLAccountId: {
      type: DataTypes.STRING
    },
    salesUnitOfMeasureId: {
      type: DataTypes.STRING
    },
    unitOfMeasureId: {
      type: DataTypes.STRING
    },
    currencyId: {
      type: DataTypes.STRING
    },
    descLong: {
      type: DataTypes.STRING
    },
    descShort: {
      type: DataTypes.STRING
    },
    priceQuantity: {
      type: DataTypes.INTEGER
    },
    quantityInterval: {
      type: DataTypes.INTEGER
    },
    maxQuantity: {
      type: DataTypes.INTEGER
    },
    minQuantity: {
      type: DataTypes.INTEGER
    },
    leadtimeInDays: {
      type: DataTypes.INTEGER
    },
    timePeriod: {
      type: DataTypes.STRING
    },
    visibility: {
      type: DataTypes.INTEGER
    },
    cost: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.INTEGER
    },
    discount: {
      type: DataTypes.INTEGER
    },
    statusDate: {
      type: DataTypes.STRING
    },
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        contractedproducts.belongsTo(models.product, {foreignKey: 'productId'});
        }
    }
  }
  );

  return contractedproducts;
};