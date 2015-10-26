"use strict";

module.exports = function(sequelize, DataTypes) {
  var classificationlongdescription = sequelize.define("classificationlongdescription", {
    language: DataTypes.STRING,
    /**
      Long Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ), 
      space and maximum 100 characters.
      Long description. Contains full description.
    */
    description: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["[a-zA-Z0-9_-\s]",'i'],
          msg: "Long Description can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )."
        },
        len: [0,500]
      }
    },
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        classificationlongdescription.belongsTo(models.classification);
        }
    }
  });

  return classificationlongdescription;
};
