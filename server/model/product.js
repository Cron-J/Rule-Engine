'use strict';

var mongoose = require('mongoose'),
    validator = require('mongoose-validators'),
    Schema = mongoose.Schema;

/**
 * @module rule
 * @description contain the details of rule information, conditions and actions.
 */

var ProductSchema = new Schema({
    /** 
      description. It can only contain string, is required and unique field which is indexed.
    */
    tenantId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },

    /** 
      status. It can only contain string, status value can be live/active; paused/inactive; unfinished.
    */
    productId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    statusId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    supplierId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    mfgProductId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    mfgProductName: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    manufacturerId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    manufacturerName: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    extProductId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    productIdExtension: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    unitOfMeasureId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    salesUnitOfMeasureId: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    keywords: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    ean: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },
    isMainProdLine: {
        type: Boolean,
        validate: [validator.isLength(1, 50)]
    },
    isForSales: {
        type: Boolean,
    },
    isSpecialOffer: {
        type: Boolean,
    },
    isStocked: {
        type: Boolean,
    },
    isPunchout: {
        type: Boolean,
    },
    isConfigurable: {
        type: Boolean,
    },
    validFrom: {
        type: Date,
    },
    validTo: {
        type: Date,
    },
    classificationGroupAssociations: [{
        /**
         * Identifier of product variant.
         */
        variantId: {
            type: String
        },

        /**
         * Identifier of Classification.
         */
        classificationId: {
            type: String,
            required: true
        },

        /**
         * Identifier of Classification Group within Classification.
         */
        classificationGroupId: {
            type: String,
            required: true
        },

        /**
         * Order number. Used for sorting associations, e.g. on UI.
         */
        orderNo: {
            type: Number
        }
    }],
    attributeValues: [{
        /**
         * Identifier of product variant.
         */
        variantId: {
            type: String
        },

        /**
         * Identifier of product attribute.
         */
        attribute: {
            type: String,
            required: true
        },

        /**
         * String representation of value or expression.
         */
        value: {
            type: String
        },

        /**
         * Javascript Expression which could be evaluated to get value.
         */
        valueExpression: {
            type: String
        },

        /**
         * Identifier of Language for multi language attribute.
         */
        languageId: {
            type: String
        },

        /**
         * Attribute value Order Number. It can be used for different kind sorting.
         */
        orderNo: {
            type: Number
        },

        /**
         * Identifier of product attribute value Status.
         */
        statusId: {
            type: String
        }
    }],
    contractedProducts: [{
        /**
         * Identifier of product variant.
         */
        variantId: {
            type: String
        },

        /**
         * Alternative customer specific product identifier.
         */
        altExtProductId: {
            type: String
        },

        /**
         * Identifier(classificationId) of customer specific classification.
         */
        extClassificationId: {
            type: String
        },

        /**
         * Identifier(classificationGroupId) of customer specific classification group.
         */
        extClassificationGroupId: {
            type: String
        },

        /**
         * Short description.
         */
        descShort: {
            type: String
        },

        /**
         * Long description.
         */
        descLong: {
            type: String
        },

        /**
         * Identifier(GLAccountId) of GLAccount.
         */
        extGLAccountId: {
            type: String
        },

        /**
         * A fraction or multiple of the order unit that indicates the quantity to
         * which all specified prices refer. If nothing is specified in this field, the
         * default value 1 is assumed, in other words the price refers to exactly one order
         * unit.
         */
        priceQuantity: {
            type: Number
        },

        /**
         * The minimum incremental amount of the product that may be puchased. Orders
         * must be in a multiple of the lotsize. NULL or 1.0 indicate that the item must be
         * purchased in whole number lots. The LotSize can be any number greater than or
         * equal to 0. It is not restricted to BigDecimal values.
         */
        quantityInterval: {
            type: Number
        },

        /**
         * The maximum quantity of the product that may be purchased. NULL indicates
         * that there is no maximum.
         */
        maxQuantity: {
            type: Number
        },

        /**
         * The minimum quantity of the product that may be purchased.  NULL (or 0.0)
         * indicate that there is no minimum.
         */
        minQuantity: {
            type: Number
        },

        /**
         * The lead time, in days, for shipment of this product. In other words,
         * time in working days needed by supplier to supply the product.
         */
        leadtimeInDays: {
            type: Number
        },

        /**
         * Identifier(unitOfMeasureId) of Sales UnitOfMeasure for Product within the current Product.
         */
        salesUnitOfMeasureId: {
            type: String
        },

        /**
         *  Currently just used for information purposes.
         */
        timePeriod: {
            type: String
        },

        /**
         * Visibility for contract assortment control. It was used up to CS71.
         * Added it for compatibility with PIM Product Model.
         * We don't use it in services of STD version.
         */
        visibility: {
            type: Number
        },

        /**
         * Unit of measure to be applied on quantity.
         * Currently just used for information purposes. We don't use it in services of STD version.
         *
         */
        unitOfMeasureId: {
            type: String
        },

        /**
         * Cost and Currency work together to define a monetary amount.
         * Currently just used for information purposes.
         */
        cost: {
            type: Number
        },

        /**
         * Cost and Currency work together to define a monetary amount.
         * Currently just used for information purposes.
         */
        currencyId: {
            type: String
        },

        /**
         * Amount and unitOfMeasureId together define a quantity.
         * Currently just used for information purposes.
         */
        ammount: {
            type: Number
        },

        /**
         * Last change of status field. (Not automated filling).
         */
        statusDate: {
            type: Date
        },

        /**
         * Discount. It defines what price discount applies to products in the contracted
         * catalog.
         */
        discount: {
            type: Number
        }
    }],
    prices: [{
        /**
         * Identifier of product variant.
         */
        variantId: {
            type: String
        },

        /**
         * Identifier of price Status.
         */
        statusId: {
            type: String
        },

        /**
         * Identifier of Currency.
         */
        currencyId: {
            type: String,
            required: true
        },

        /**
         * Identifier of Price type.
         */
        priceTypeId: {
            type: String
        },

        /**
         * Value of Price.
         */
        netPrice: {
            type: Number,
            required: true
        },

        /**
         * Value of grossPrice. use netPrice in combination with priceTypeId
         */
        grossPrice: {
            type: Number
        },

        /**
         * Value of fixNetPrice. use netPrice in combination with priceTypeId
         */
        fixNetPrice: {
            type: Number
        },

        /**
         * Value of listPrice. use netPrice in combination with priceTypeId
         */
        listPrice: {
            type: Number
        },

        /**
         * Price is valid from quantity
         */
        validFromQuantity: {
            type: Number,
            required: true
        },

        /**
         * Price valid range from.
         */
        validFrom: {
            type: Date
        },
        /**
         * Price valid range to.
         */
        validTo: {
            type: Date
        },

        /**
         * Identifier of UnitOfMeasure for Price.
         */
        unitOfMeasureId: {
            type: String
        },

        /**
         * ProductIdExtensionForUoM.
         */
        productIdExtensionForUoM: {
            type: String
        },

        /**
         * Price unit.
         */
        priceUnit: {
            type: Number
        },

        /**
         * Description.
         */
        description: {
            type: String
        },

        /**
         * Vat percentage.
         */
        vatPercentage: {
            type: Number
        },

        /**
         * Is preferred.
         */
        isPreferred: {
            type: Boolean,
            required: true
        }
    }],
    productRelations: [{
        /**
         * Identifier of product variant.
         */
        variantId: {
            type: String
        },

        /**
         * Identifier of related product.
         */
        relatedProductId: {
            type: String
        },

        /**
         * Translated descriptions of ProductRelation.
         * key is languageId, value is description for language
         */
        descriptions: {
            type: String
        },

        /**
         * Identifier of Product Relation Type.
         */
        typeId: {
            type: String
        },

        /**
         * Relation valid range from.
         */
        validFrom: {
            type: Date
        },

        /**
         * Relation valid range to.
         */
        validTo: {
            type: Date
        },

        /**
         * Relation Quantity.
         */
        quantity: {
            type: Number
        },

        /**
         * Identifier of product relation Status.
         */
        statusId: {
            type: String
        },

        /**
         * Relation SeqNo.
         */
        seqNo: {
            type: String
        },

        /**
         *  Base UDX info: text info for any purposes.
         */
        udxText1: {
            type: String
        },

        /**
         *  Base UDX info: text info for any purposes.
         */
        udxText2: {
            type: String
        },

        /**
         *  Base UDX info: text info for any purposes.
         */
        udxText3: {
            type: String
        },

        /**
         *  Base UDX info: numeric info for any purposes.
         */
        udxNum1: {
            type: Number
        },

        /**
         *  Base UDX info: numeric info for any purposes.
         */
        udxNum2: {
            type: Number
        },

        /**
         *  Base UDX info: numeric info for any purposes.
         */
        udxNum3: {
            type: Number
        },

        /**
         *  Base UDX info: info for any sorting purposes.
         */
        udxSortKey1: {
            type: String
        },

        /**
         *  Base UDX info: info for any sorting purposes.
         */
        udxSortKey2: {
            type: String
        },

        /**
         *  Base UDX info: info for any sorting purposes.
         */
        udxSortKey3: {
            type: String
        },

        /**
         * Sync type Id.
         */
        syncTypeId: {
            type: String
        },

        /**
         * IsMandatory.
         */
        isMandatory: {
            type: Boolean
        },

        /**
         * Selection Group Id.
         */
        selectionGroupId: {
            type: String
        },

        /**
         * Is used to decide whether corresponding related product
         * should be selected by default within a kit/configurable product.
         */
        isDefaultSelected: {
            type: Boolean
        }
    }],
    documents: [{
        /**
         * Identifier of product variant.
         */
        variantId: {
            type: String
        },

        /**
         * Path to external document (image, pdf and etc).
         */
        path: {
            type: String
        },

        /**
         * Identifier of Document view type.
         */
        documentViewTypeId: {
            type: String
        },

        /**
         * Order number.
         */
        orderNo: {
            type: Number
        },

        /**
         * Identifier of Language.
         */
        languageId: {
            type: String
        },

        /**
         * Description.
         */
        description: {
            type: String
        },

        /**
         * Product valid range from.
         */
        validFrom: {
            type: Date
        },

        /**
         * Product valid range to.
         */
        validTo: {
            type: Date
        }

    }],
    variants: [{
        /**
         * Id for varient.
         */
        variantId: {
            type: String,
            unique: true,
            sparse: true,
            required: true
        },

        /**
         * Identifier of list of product attribute.
         */
        attributes: [{
            type: String
        }],


        /**
         * Is used to decide whether varient need new Classification Group for a product.
         * Default selection is false.
         */
        hasVariantClassificationGroupAssociations: {
            type: Boolean,
            default: false
        },

        /**
         * Is used to decide whether varient need new Price for a product.
         * Default selection is false.
         */
        hasVariantPrices: {
            type: Boolean,
            default: false
        },

        /**
         * Is used to decide whether varient need new Doc Association for a product.
         * Default selection is false.
         */
        hasVariantDocAssociation: {
            type: Boolean,
            default: false
        },

        /**
         * Is used to decide whether varient need new Product Relation for a product.
         * Default selection is false.
         */
        hasVariantProductRelation: {
            type: Boolean,
            default: false
        },

        /**
         * Is used to decide whether varient need new Contracted Product for a product.
         * Default selection is false.
         */
        hasVariantContractedProducts: {
            type: Boolean,
            default: false
        },

        /**
         * Is used to decide whether varient need new Attribute Values for a product.
         * Default selection is false.
         */
        hasVariantAttributeValues: {
            type: Boolean,
            default: false
        }

    }]

});

ProductSchema.statics.createProduct = function(data, callback) {
    var product = new this(data);
    product.save(callback);
};

ProductSchema.statics.findProduct = function(callback) {
    this.find(callback);
};

var product = mongoose.model('product', ProductSchema);

/** export schema */
module.exports = {
    Product: product
};