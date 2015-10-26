"use strict";

module.exports = function(sequelize, DataTypes) {
  var attributesection = sequelize.define("attributesection", {
    /**
      Attribute Section ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - )
      and underscores ( _ ) and is the required field and unique field and maximum 50 characters.
    */
    attributeSectionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Attribute Section ID cannot be empty"
        },
        is: {
          args: ["^[a-zA-Z0-9_-]+$",'i'],
          msg: "Attribute Section ID can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - )."
        },
        len: {
            args: [0,50],
            msg: "Attribute Section ID length should between 0 and 50"
        },
        isUnique: function (value, next) {
          var myId = this.id;
          attributesection.find({where:{attributeSectionId: value}}).then(function(data) {
            if(data && data.attributeSectionId && data.id != myId) {
              return next('Attribute Section Id should be unique');
            }
            return next();
          }).catch(function (err) {
              return next(err);
          });
        }
      }
    },
    /**
      Order Number. It should be Number.
    */
    orderNo: DataTypes.INTEGER,
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        attributesection.hasMany(models.attribute);
        attributesection.hasMany(models.attributesectionname, { onDelete: 'cascade' , onUpdate: 'cascade'});
        attributesection.hasMany(models.attributesectiondescription, { onDelete: 'cascade' , onUpdate: 'cascade'});
      }
    }
  });

  return attributesection;
};
