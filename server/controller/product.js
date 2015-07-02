var Product = require('../model/product').Product,
    mongoose = require('mongoose'),
    Joi = require('joi'),
    Boom = require('boom');




exports.createProduct = {
    handler: function(request, reply) {
        for (var i = 0; i < 10; i++) {
            var productObj = {
                "product": {
                    "tenantId": randomString(5),
                    "productId": randomString(5),
                    "supplierId": randomString(5),
                    "statusId": randomString(5),
                    "mfgProductId": randomString(5),
                    "mfgProductName": randomString(5),
                    "manufacturerId": randomString(5),
                    "manufacturerName": randomString(5),
                    "productIdExtension": randomString(5),
                    "unitOfMeasureId": randomString(5),
                    "salesUnitOfMeasureId": randomString(5),
                    "keywords": randomString(5),
                    "ean": randomString(5),
                    "isMainProdLine": parseInt(Math.random() * 2) ? true : false,
                    "isForSales": parseInt(Math.random() * 2) ? true : false,
                    "isStocked": parseInt(Math.random() * 2) ? true : false,
                    "isPunchout": parseInt(Math.random() * 2) ? true : false,
                    "isConfigurable": parseInt(Math.random() * 2) ? true : false,
                    "validFrom": randomDate(new Date(2016, 0, 1)),
                    "validTo": randomDate(new Date(2016, 0, 1)),
                    "classificationGroupAssociations": [{
                        "variantId": randomString(5),
                        "classificationId": randomString(5),
                        "classificationGroupId": randomString(5),
                        "orderNo": getRandomNumber(100, 1000000)
                    }],
                    "attributeValues": [{
                        "variantId": randomString(5),
                        "attribute": randomString(5),
                        "value": randomString(5),
                        "valueExpression": randomString(5),
                        "languageId": randomString(5),
                        "orderNo": getRandomNumber(100, 1000000),
                        "statusId": randomString(5),
                        "channels": randomString(5)
                    }],
                    "contractedProducts": [{
                        "variantId": randomString(5),
                        "altExtProductId": randomString(5),
                        "extClassificationId": randomString(5),
                        "extClassificationGroupId": randomString(5),
                        "descShort": randomString(5),
                        "descLong": randomString(5),
                        "extGLAccountId": getRandomNumber(100, 1000000),
                        "priceQuantity": getRandomNumber(100, 1000000),
                        "quantityInterval": getRandomNumber(100, 1000000),
                        "maxQuantity": getRandomNumber(100, 1000000),
                        "minQuantity": getRandomNumber(100, 1000000),
                        "leadtimeInDays": getRandomNumber(100, 1000000),
                        "salesUnitOfMeasureId": randomString(5),
                        "timePeriod": randomString(5),
                        "visibility": getRandomNumber(100, 1000000),
                        "unitOfMeasureId": randomString(5),
                        "cost": getRandomNumber(100, 1000000),
                        "currencyId": randomString(5),
                        "ammount": getRandomNumber(100, 1000000),
                        "statusDate": randomDate(new Date(2016, 0, 1)),
                        "discount": getRandomNumber(100, 1000000)
                    }],
                    "prices": [{
                        "variantId": randomString(5),
                        "statusId": randomString(5),
                        "currencyId": randomString(5),
                        "priceTypeId": randomString(5),
                        "netPrice": getRandomNumber(100, 1000000),
                        "grossPrice": getRandomNumber(100, 1000000),
                        "fixNetPrice": getRandomNumber(100, 1000000),
                        "listPrice": getRandomNumber(100, 1000000),
                        "validFromQuantity": getRandomNumber(100, 1000000),
                        "validFrom": randomDate(new Date(2016, 0, 1)),
                        "validTo": randomDate(new Date(2016, 0, 1)),
                        "unitOfMeasureId": randomString(5),
                        "productIdExtensionForUoM": randomString(5),
                        "priceUnit": getRandomNumber(100, 1000000),
                        "description": randomString(5),
                        "vatPercentage": getRandomNumber(100, 1000000),
                        "isPreferred": randomString(5)
                    }],
                    "productRelations": [{
                        "variantId": randomString(5),
                        "relatedProductId": randomString(5),
                        "descriptions": randomString(5),
                        "typeId": randomString(5),
                        "quantity": getRandomNumber(100, 1000000),
                        "statusId": randomString(5),
                        "seqNo": randomString(5),
                        "udxText1": randomString(5),
                        "udxText2": randomString(5),
                        "validFrom": randomDate(new Date(2016, 0, 1)),
                        "validTo": randomDate(new Date(2016, 0, 1)),
                        "udxText3": randomString(5),
                        "udxNum1": getRandomNumber(100, 1000000),
                        "udxNum2": getRandomNumber(100, 1000000),
                        "udxNum3": getRandomNumber(100, 1000000),
                        "udxSortKey1": randomString(5),
                        "udxSortKey2": randomString(5),
                        "udxSortKey3": randomString(5),
                        "syncTypeId": randomString(5),
                        "isMandatory": parseInt(Math.random() * 2) ? true : false,
                        "selectionGroupId": randomString(5),
                        "isDefaultSelected": parseInt(Math.random() * 2) ? true : false
                    }],
                    "documents": [{
                        "variantId": randomString(5),
                        "path": randomString(5),
                        "documentViewTypeId": randomString(5),
                        "orderNo": getRandomNumber(100, 1000000),
                        "languageId": randomString(5),
                        "description": randomString(5),
                        "validFrom": randomDate(new Date(2016, 0, 1)),
                        "validTo": randomDate(new Date(2016, 0, 1))
                    }],
                    "variants": [{
                        "variantId": randomString(5),
                        "attributes": randomString(5),
                        "hasVariantClassificationGroupAssociations": parseInt(Math.random() * 2) ? true : false,
                        "hasVariantPrices": parseInt(Math.random() * 2) ? true : false,
                        "hasVariantDocAssociation": parseInt(Math.random() * 2) ? true : false,
                        "hasVariantProductRelation": parseInt(Math.random() * 2) ? true : false,
                        "hasVariantContractedProducts": parseInt(Math.random() * 2) ? true : false,
                        "hasVariantAttributeValues": parseInt(Math.random() * 2) ? true : false
                    }]
                }

            }
            Product.createProduct(productObj, function(err, result) {
                if (!err) {
                    console.log(result); // HTTP 201
                }
                console.log(err); // HTTP 403
            });
        }
    }
};

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomDate(start) {
    return new Date(Math.random() * start.getTime());
}