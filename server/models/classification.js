"use strict";

module.exports = function(sequelize, DataTypes) {
  var Classification = sequelize.define("classification", {
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
          args: ["^[a-zA-Z0-9_-]+$",'i'],
          msg: "Classification ID can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )."
        },
        notEmpty: true,
        len:[1,30],
        isUnique: function (value, next) {
          var myId = this.id;
          Classification.find({where:{classificationId: value}}).then(function(data) {
            if(data && data.classificationId && data.id != myId) {
              return next('Classification Id should be unique');
            }
            return next();
          }).catch(function (err) {
              return next(err);
          });
        }
      }
    },
    /**
      Version no of classification. It should be string and maximum 10 characters.
    */
    versionNo: {
      type: DataTypes.STRING,
      validate: {
        len: {
            args: [0,30],
            msg: "Classification version length should between 0 and 30"
        }
      }
    },
    /**
      Type of classification. should be string and maximum 11 characters.
      Type of classification, like UNSPSC, eClass etc.
    */
    type: {
      type: DataTypes.STRING,
      validate: {
        len: {
            args: [0,30],
            msg: "Classification type length between 0 and 11"
        }
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
      allowNull: true,
      notEmpty: false,
      validate: {
        is: {
          args: ["^$|^(((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,}))?$",'i'],
          msg: "document URL 1 should be a valid URL"
        },
        len: {
            args: [0,250],
            msg: "document URL 1 should length should between 0 and 250"
        }
      }
    },

    /**
      Document URL 2. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification.
      Document URL 2. It can only contain type URL and maximum 250 characters.
    */
    documentUrl2: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["^$|^(((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,}))?$",'i'],
          msg: "document URL 2 should be a valid URL"
        },
        len: {
            args: [0,250],
            msg: "document URL 2 should length should between 0 and 250"
        }
      }
    },

    /**
      Document URL 3. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification.
      Document URL 3. It can only contain type URL and maximum 250 characters.
    */
    documentUrl3: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: false,
      validate: {
        is: {
          args: ["^$|^(((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,}))?$",'i'],
          msg: "document URL 3 should be a valid URL"
        },
        len: {
            args: [0,250],
            msg: "document URL 3 should length should between 0 and 250"
        }
      }
    },
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        Classification.hasOne(models.classificationgroup);
        Classification.hasMany(models.classificationlongdescription , { onDelete: 'cascade' , onUpdate: 'cascade'});
        Classification.hasMany(models.classificationshortdescription , { onDelete: 'cascade' , onUpdate: 'cascade'});
        Classification.belongsTo(models.tenant);
      }
    }
  }
  );

  return Classification;
};
