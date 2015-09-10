"use strict";

module.exports = function(sequelize, DataTypes) {
  var Attribute = sequelize.define("Attribute", {
    /** 
      Attribute ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ),
      is the required and unique field and maximum 50 characters.
    */
    attributeId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: ["[a-zA-Z0-9_-]",'i'],
          msg: "Attribute ID can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )."
        },
        len: [2,250],
        notEmpty: true
      }
    },
    /**
      External Attribute ID. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )
      and maximum 100 characters.
    */
    extAttributeId: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["[a-zA-Z0-9_-]",'i'],
          msg: "Externall Attribute ID can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )."
        },
        len: [2,250]
      }
    },
    /**
      Ext Default Name. It can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ ),
      space and maximum 50 characters.
    */
    extDefaultName: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["[a-zA-Z0-9_-\s]",'i'],
          msg: "Extt Default Name can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens ( - ), underscores ( _ )."
        },
        len: [0,50]
      }
    },
    /**
      Select Unit of Measure from the drop down list.
    */
    unitOfMeasure: DataTypes.STRING,
    /**
      Order Number. It should be Number.
    */
    orderNo: DataTypes.INTEGER,
    
    /**
      Multivalued. should be Boolean.
    */
    isMultivalued: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },    

    /**
      Required. should be Boolean.
    */
    isRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    /**
      MultiLanguage. should be Boolean.
    */
    isMultiLanguage: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    /**
      Variable. should be Boolean.
    */
    isVariable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    /*
      ValueOption. Attribute value.
    */
    valueOption: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    /*
      Type. should be array  of JSON object
    */
    type: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    /**
      Readonly. should be Boolean.
    */
    isReadonly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        Attribute.belongsTo(models.AttributeSection);
        Attribute.hasMany(models.ClassGrpToAttribute);
        Attribute.hasMany(models.AttributeLongDescription , { onDelete: 'cascade' , onUpdate: 'cascade'});
        Attribute.hasMany(models.AttributeShortDescription , { onDelete: 'cascade' , onUpdate: 'cascade'});
      }
    }
  });

  return Attribute;
};