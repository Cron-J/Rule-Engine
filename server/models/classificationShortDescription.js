"use strict";

module.exports = function(sequelize, DataTypes) {
  var ClassificationShortDescription = sequelize.define("ClassificationShortDescription", {
    language: DataTypes.STRING,
    /**
      Short Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), space
      and maximum 20 characters.
      Short description. Shortly describes.
    */
    description: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["[a-zA-Z0-9_-\s]",'i'],
          msg: "Short Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), space."
        },
        len: [0,200]
      }
    },
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        ClassificationShortDescription.belongsTo(models.Classification);
        }
    }
  });

  return ClassificationShortDescription;
};
