/**
 * Created by Eswer on 10/23/2015.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var variants = sequelize.define("variants", {
            variantId: {
                type: DataTypes.STRING
            },
            variantAttributes : {
                type: DataTypes.STRING,
                allowNull: false
            },
            hasVariantClassificationGroupAssociations: {
                type: DataTypes.BOOLEAN
            },
            hasVariantPrices: {
                type: DataTypes.BOOLEAN
            },
            hasVariantDocAssociation: {
                type: DataTypes.BOOLEAN
            },
            hasVariantProductRelation: {
                type: DataTypes.BOOLEAN
            },
            hasVariantContractedProducts: {
                type: DataTypes.BOOLEAN
            },
            hasVariantAttributeValues: {
                type: DataTypes.BOOLEAN
            }
        },
        {
            classMethods: {
                associate: function (models) {
                    variants.belongsTo(models.product, {foreignKey: 'productId'});
                }
            }
        }
    );

    return variants;
};