{
    "field": "product",
    "attributes": [
        {
            "field": "tenantId",
            "index": true,
            "isRequired": true,
            "instance": "String"
        },
        {
            "field": "productId",
            "index": {
                "unique": true,
                "background": true
            },
            "isRequired": true,
            "instance": "String"
        },
        {
            "field": "supplierId",
            "index": true,
            "instance": "String"
        },
        {
            "field": "statusId",
            "index": null,
            "instance": "String"
        },
        {
            "field": "mfgProductId",
            "index": null,
            "instance": "String"
        },
        {
            "field": "mfgProductName",
            "index": null,
            "instance": "String"
        },
        {
            "field": "manufacturerId",
            "index": null,
            "instance": "String"
        },
        {
            "field": "manufacturerName",
            "index": null,
            "instance": "String"
        },
        {
            "field": "extProductId",
            "index": null,
            "instance": "String"
        },
        {
            "field": "productIdExtension",
            "index": null,
            "instance": "String"
        },
        {
            "field": "unitOfMeasureId",
            "index": null,
            "instance": "String"
        },
        {
            "field": "salesUnitOfMeasureId",
            "index": null,
            "instance": "String"
        },
        {
            "field": "keywords",
            "index": null,
            "instance": "String"
        },
        {
            "field": "ean",
            "index": null,
            "instance": "String"
        },
        {
            "field": "isMainProdLine",
            "index": null
        },
        {
            "field": "isForSales",
            "index": null
        },
        {
            "field": "isSpecialOffer",
            "index": null
        },
        {
            "field": "isStocked",
            "index": null
        },
        {
            "field": "isPunchout",
            "index": null
        },
        {
            "field": "isConfigurable",
            "index": null
        },
        {
            "field": "validFrom",
            "index": null
        },
        {
            "field": "validTo",
            "index": null
        },
        {
            "field": "classificationGroupAssociations",
            "attributes": [
                {
                    "field": "variantId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "classificationId",
                    "index": null,
                    "isRequired": true,
                    "instance": "String"
                },
                {
                    "field": "classificationGroupId",
                    "index": null,
                    "isRequired": true,
                    "instance": "String"
                },
                {
                    "field": "orderNo",
                    "index": null,
                    "instance": "Number"
                }
            ]
        },
        {
            "field": "attributeValues",
            "attributes": [
                {
                    "field": "variantId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "attribute",
                    "index": null,
                    "isRequired": true,
                    "instance": "String"
                },
                {
                    "field": "value",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "valueExpression",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "languageId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "orderNo",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "statusId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "channels",
                    "index": null
                }
            ]
        },
        {
            "field": "contractedProducts",
            "attributes": [
                {
                    "field": "variantId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "altExtProductId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "extClassificationId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "extClassificationGroupId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "descShort",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "descLong",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "extGLAccountId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "priceQuantity",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "quantityInterval",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "maxQuantity",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "minQuantity",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "leadtimeInDays",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "salesUnitOfMeasureId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "timePeriod",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "visibility",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "unitOfMeasureId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "cost",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "currencyId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "ammount",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "statusDate",
                    "index": null
                },
                {
                    "field": "discount",
                    "index": null,
                    "instance": "Number"
                }
            ]
        },
        {
            "field": "prices",
            "attributes": [
                {
                    "field": "variantId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "statusId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "currencyId",
                    "index": null,
                    "isRequired": true,
                    "instance": "String"
                },
                {
                    "field": "priceTypeId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "netPrice",
                    "index": null,
                    "isRequired": true,
                    "instance": "Number"
                },
                {
                    "field": "grossPrice",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "fixNetPrice",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "listPrice",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "validFromQuantity",
                    "index": null,
                    "isRequired": true,
                    "instance": "Number"
                },
                {
                    "field": "validFrom",
                    "index": null
                },
                {
                    "field": "validTo",
                    "index": null
                },
                {
                    "field": "unitOfMeasureId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "productIdExtensionForUoM",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "priceUnit",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "description",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "vatPercentage",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "isPreferred",
                    "index": null,
                    "isRequired": true
                }
            ]
        },
        {
            "field": "productRelations",
            "attributes": [
                {
                    "field": "variantId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "relatedProductId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "descriptions",
                    "index": null
                },
                {
                    "field": "typeId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "validFrom",
                    "index": null
                },
                {
                    "field": "validTo",
                    "index": null
                },
                {
                    "field": "quantity",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "statusId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "seqNo",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "udxText1",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "udxText2",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "udxText3",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "udxNum1",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "udxNum2",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "udxNum3",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "udxSortKey1",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "udxSortKey2",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "udxSortKey3",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "syncTypeId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "isMandatory",
                    "index": null
                },
                {
                    "field": "selectionGroupId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "isDefaultSelected",
                    "index": null
                }
            ]
        },
        {
            "field": "documents",
            "attributes": [
                {
                    "field": "variantId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "path",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "documentViewTypeId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "orderNo",
                    "index": null,
                    "instance": "Number"
                },
                {
                    "field": "languageId",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "description",
                    "index": null,
                    "instance": "String"
                },
                {
                    "field": "validFrom",
                    "index": null
                },
                {
                    "field": "validTo",
                    "index": null
                }
            ]
        },
        {
            "field": "variants",
            "attributes": [
                {
                    "field": "variantId",
                    "index": {
                        "unique": true,
                        "sparse": true,
                        "background": true
                    },
                    "isRequired": true,
                    "instance": "String"
                },
                {
                    "field": "attributes",
                    "index": null
                },
                {
                    "field": "hasVariantClassificationGroupAssociations",
                    "index": null
                },
                {
                    "field": "hasVariantPrices",
                    "index": null
                },
                {
                    "field": "hasVariantDocAssociation",
                    "index": null
                },
                {
                    "field": "hasVariantProductRelation",
                    "index": null
                },
                {
                    "field": "hasVariantContractedProducts",
                    "index": null
                },
                {
                    "field": "hasVariantAttributeValues",
                    "index": null
                }
            ]
        }
    ]
}