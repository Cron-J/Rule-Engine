export class AggregatorStore {
    constructor(){
        return {atleastOne : 'atleastOne', forAll: 'forAll', anyOf : 'anyOf', exactlyOne: 'exactlyOne'};
    }
}
class SchemaStore {
  constructor() {
    this.schema = {'product': {
        "tenantId": {
            "index": true,
            "isRequired": true,
            "instance": "String"
        },
        "productId": {
            "index": {
                "unique": true,
                "background": true
            },
            "isRequired": true,
            "instance": "String"
        },
        "supplierId": {
            "index": true,
            "instance": "String"
        },
        "statusId": {
            "index": null,
            "instance": "String"
        },
        "mfgProductId": {
            "index": null,
            "instance": "String"
        },
        "mfgProductName": {
            "index": null,
            "instance": "String"
        },
        "manufacturerId": {
            "index": null,
            "instance": "String"
        },
        "manufacturerName": {
            "index": null,
            "instance": "String"
        },
        "extProductId": {
            "index": null,
            "instance": "String"
        },
        "productIdExtension": {
            "index": null,
            "instance": "String"
        },
        "unitOfMeasureId": {
            "index": null,
            "instance": "String"
        },
        "salesUnitOfMeasureId": {
            "index": null,
            "instance": "String"
        },
        "keywords": {
            "index": null,
            "instance": "String"
        },
        "ean": {
            "index": null,
            "instance": "String"
        },
        "isMainProdLine": {
            "index": null
        },
        "isForSales": {
            "index": null,
            "instance": "Boolean"
        },
        "isSpecialOffer": {
            "index": null,
            "instance": "Boolean"
        },
        "isStocked": {
            "index": null,
            "instance": "Boolean"
        },
        "isPunchout": {
            "index": null,
            "instance": "Boolean"
        },
        "isConfigurable": {
            "index": null,
            "instance": "Boolean"
        },
        "validFrom": {
            "index": null,
            "instance": "Date"
        },
        "validTo": {
            "index": null,
            "instance": "Date"
        },
        "classificationGroupAssociations": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "classificationId": {
                "index": null,
                "isRequired": true,
                "instance": "String"
            },
            "classificationGroupId": {
                "index": null,
                "isRequired": true,
                "instance": "String"
            },
            "orderNo": {
                "index": null,
                "instance": "Number"
            }
        },
        "attributeValues": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "attribute": {
                "index": null,
                "isRequired": true,
                "instance": "String"
            },
            "value": {
                "index": null,
                "instance": "String"
            },
            "valueExpression": {
                "index": null,
                "instance": "String"
            },
            "languageId": {
                "index": null,
                "instance": "String"
            },
            "orderNo": {
                "index": null,
                "instance": "Number"
            },
            "statusId": {
                "index": null,
                "instance": "String"
            },
            "channels": {
                "index": null,
                "instance": "String"
            }
        },
        "contractedProducts": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "altExtProductId": {
                "index": null,
                "instance": "String"
            },
            "extClassificationId": {
                "index": null,
                "instance": "String"
            },
            "extClassificationGroupId": {
                "index": null,
                "instance": "String"
            },
            "descShort": {
                "index": null,
                "instance": "String"
            },
            "descLong": {
                "index": null,
                "instance": "String"
            },
            "extGLAccountId": {
                "index": null,
                "instance": "String"
            },
            "priceQuantity": {
                "index": null,
                "instance": "Number"
            },
            "quantityInterval": {
                "index": null,
                "instance": "Number"
            },
            "maxQuantity": {
                "index": null,
                "instance": "Number"
            },
            "minQuantity": {
                "index": null,
                "instance": "Number"
            },
            "leadtimeInDays": {
                "index": null,
                "instance": "Number"
            },
            "salesUnitOfMeasureId": {
                "index": null,
                "instance": "String"
            },
            "timePeriod": {
                "index": null,
                "instance": "String"
            },
            "visibility": {
                "index": null,
                "instance": "Number"
            },
            "unitOfMeasureId": {
                "index": null,
                "instance": "String"
            },
            "cost": {
                "index": null,
                "instance": "Number"
            },
            "currencyId": {
                "index": null,
                "instance": "String"
            },
            "ammount": {
                "index": null,
                "instance": "Number"
            },
            "statusDate": {
                "index": null,
                "instance": "Date"
            },
            "discount": {
                "index": null,
                "instance": "Number"
            }
        },
        "prices": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "statusId": {
                "index": null,
                "instance": "String"
            },
            "currencyId": {
                "index": null,
                "isRequired": true,
                "instance": "String"
            },
            "priceTypeId": {
                "index": null,
                "instance": "String"
            },
            "netPrice": {
                "index": null,
                "isRequired": true,
                "instance": "Number"
            },
            "grossPrice": {
                "index": null,
                "instance": "Number"
            },
            "fixNetPrice": {
                "index": null,
                "instance": "Number"
            },
            "listPrice": {
                "index": null,
                "instance": "Number"
            },
            "validFromQuantity": {
                "index": null,
                "isRequired": true,
                "instance": "Number"
            },
            "validFrom": {
                "index": null,
                "instance": "Date"
            },
            "validTo": {
                "index": null,
                "instance": "Date"
            },
            "unitOfMeasureId": {
                "index": null,
                "instance": "String"
            },
            "productIdExtensionForUoM": {
                "index": null,
                "instance": "String"
            },
            "priceUnit": {
                "index": null,
                "instance": "Number"
            },
            "description": {
                "index": null,
                "instance": "String"
            },
            "vatPercentage": {
                "index": null,
                "instance": "Number"
            },
            "isPreferred": {
                "index": null,
                "isRequired": true,
                "instance": "Boolean"
            }
        },
        "productRelations": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "relatedProductId": {
                "index": null,
                "instance": "String"
            },
            "descriptions": {
                "index": null,
                "instance": "String"
            },
            "typeId": {
                "index": null,
                "instance": "String"
            },
            "validFrom": {
                "index": null,
                "instance": "Date"
            },
            "validTo": {
                "index": null,
                "instance": "Date"
            },
            "quantity": {
                "index": null,
                "instance": "Number"
            },
            "statusId": {
                "index": null,
                "instance": "String"
            },
            "seqNo": {
                "index": null,
                "instance": "String"
            },
            "udxText1": {
                "index": null,
                "instance": "String"
            },
            "udxText2": {
                "index": null,
                "instance": "String"
            },
            "udxText3": {
                "index": null,
                "instance": "String"
            },
            "udxNum1": {
                "index": null,
                "instance": "Number"
            },
            "udxNum2": {
                "index": null,
                "instance": "Number"
            },
            "udxNum3": {
                "index": null,
                "instance": "Number"
            },
            "udxSortKey1": {
                "index": null,
                "instance": "String"
            },
            "udxSortKey2": {
                "index": null,
                "instance": "String"
            },
            "udxSortKey3": {
                "index": null,
                "instance": "String"
            },
            "syncTypeId": {
                "index": null,
                "instance": "String"
            },
            "isMandatory": {
                "index": null,
                "instance": "Boolean"
            },
            "selectionGroupId": {
                "index": null,
                "instance": "String"
            },
            "isDefaultSelected": {
                "index": null,
                "instance": "Boolean"
            }
        },
        "documents": {
            "variantId": {
                "index": null,
                "instance": "String"
            },
            "path": {
                "index": null,
                "instance": "String"
            },
            "documentViewTypeId": {
                "index": null,
                "instance": "String"
            },
            "orderNo": {
                "index": null,
                "instance": "Number"
            },
            "languageId": {
                "index": null,
                "instance": "String"
            },
            "description": {
                "index": null,
                "instance": "String"
            },
            "validFrom": {
                "index": null,
                "instance": "Date"
            },
            "validTo": {
                "index": null,
                "instance": "Date"
            }
        },
        "variants": {
            "variantId": {
                "index": {
                    "unique": true,
                    "sparse": true,
                    "background": true
                },
                "isRequired": true,
                "instance": "String"
            },
            "attributes": {
                "index": null,
                "instance": "String"
            },
            "hasVariantClassificationGroupAssociations": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantPrices": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantDocAssociation": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantProductRelation": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantContractedProducts": {
                "index": null,
                "instance": "Boolean"
            },
            "hasVariantAttributeValues": {
                "index": null,
                "instance": "Boolean"
            }
        }
    }};
  }
}

export default SchemaStore;
