"use strict";

module.exports = function (sequelize, DataTypes) {
    var classification_group_associations = sequelize.define("classification_group_associations", {
            classificationId: DataTypes.STRING,
            classificationGroupId: DataTypes.STRING,
            orderNo: {
                type: DataTypes.STRING
            },
            createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
            updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
        },
        {
            classMethods: {
                associate: function (models) {
                    classification_group_associations.belongsTo(models.product, {foreignKey: 'productId'});
                }
            }
        }
    );

    return classification_group_associations;
};