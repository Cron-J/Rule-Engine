"use strict";

module.exports = function(sequelize, DataTypes) {
  var Classification = sequelize.define("Classification", {
    /**
      Classification ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ),
      is the required and unique field and maximum 30 characters.
    */
    classificationId: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: {
          args: ["[a-zA-Z0-9_-]",'i'],
          msg: "Classification ID can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )."
        },
        notEmpty: true,
        len:[1,30]
      }
    },
    /**
      Version no of classification. It should be string and maximum 10 characters.
    */
    versionNo: {
      type: DataTypes.STRING,
      validate: {
      	len:[0,30]
      }
    },
    /**
      Type of classification. should be string and maximum 11 characters.
      Type of classification, like UNSPSC, eClass etc.
    */
    type: {
      type: DataTypes.STRING,
      validate: {
      	len:[0,11]
      }
    },
    /**
      Order number. It should be Number.
      Order number. Defines classification sequence between others. Is used by some customers for sorting classification items on UI in case when they are displayed in one list.
    */
    orderNo: DataTypes.INTEGER,
    
    /**
      Document URL 1. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification.
      Document URL 1. It can only contain type URL and maximum 250 characters.
    */
    documentUrl1: {
      type: DataTypes.STRING,
      validate: {
      	isUrl: true,
      	len: [0,250]
      }
    },
    
    /**
      Document URL 2. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification.
      Document URL 2. It can only contain type URL and maximum 250 characters.
    */
    documentUrl2: {
      type: DataTypes.STRING,
      validate: {
      	isUrl: true,
      	len: [0,250]
      }
    },

    /**
      Document URL 3. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification.
      Document URL 3. It can only contain type URL and maximum 250 characters.
    */
    documentUrl3: {
      type: DataTypes.STRING,
      validate: {
      	isUrl: true,
      	len:[0,250]
      }
    },
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        Classification.hasOne(models.ClassificationGroup);
        Classification.hasMany(models.ClassificationLongDescription , { onDelete: 'cascade' , onUpdate: 'cascade'});
        Classification.hasMany(models.ClassificationShortDescription , { onDelete: 'cascade' , onUpdate: 'cascade'});
        Classification.belongsTo(models.Tenant);
      }
    }
  }
  );

  return Classification;
};
