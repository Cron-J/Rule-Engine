"use strict";

module.exports = function(sequelize, DataTypes) {
  /** 
    * @module tenant
    * @description tenant class contains the details of tenant
  */
  
  var Tenant = sequelize.define("Tenant", {
    tenantId: DataTypes.STRING,
    /** name must be string and required field */
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    /** status must be string and required field */
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    /** description must be string */
    description: DataTypes.STRING,
    /** valid from must be string and required field */
    validFrom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /** valid to must be string and required field */
    validTo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    classMethods: {
      associate: function(models) {
        Tenant.hasMany(models.Classification)
      }
    }
  });

  return Tenant;
};
