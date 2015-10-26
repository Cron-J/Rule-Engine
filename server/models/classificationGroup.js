"use strict";

module.exports = function(sequelize, DataTypes) {
  var ClassificationGroup = sequelize.define("classificationgroup", {
    /**
      Hierarchy Code. It should be string and maximum 100 characters.
    */
    hierarchyCode: {
      type: DataTypes.STRING,
      validate: {
        len: [0,100]
      }
    },

    /**
      Status. It should be string and required.
    */
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    /**
      order number. It should be Number.
    */
    orderNo: DataTypes.INTEGER,
    /**
      Document URL 1. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification group.
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
      Document URL 2. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification group.
      Document URL 2. It can only contain type URL and maximum 250 characters.
    */
    documentUrl2: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: false,
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
      Document URL 3. Defines url(or workarea relative path) to image/pdf/doc of another document that describes classification group.
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
      	ClassificationGroup.hasOne(models.classificationgroup);
        ClassificationGroup.hasMany(models.classgrptoattribute);
        ClassificationGroup.hasMany(models.classgrplongdescription , { onDelete: 'cascade' , onUpdate: 'cascade'});
        ClassificationGroup.hasMany(models.classgrpshortdescription , { onDelete: 'cascade' , onUpdate: 'cascade'});
      }
    }
  }
  );

  return ClassificationGroup;
};
