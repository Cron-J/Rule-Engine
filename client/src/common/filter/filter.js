app.filter('instanceFilter', function() {
    return function(Objs, categoryValue, categoryObj, subCategoryValue, subCategoryObj) {
        var filteredObj = {};
        var category;
        var subCategory;

        function equivalentInstance(ins) {
            var equiInstanceObj = {
                'String': 'text',
                'Number': 'number',
                'undefined': 'none'
            }

            return equiInstanceObj[ins]
        }
        for (var i = 0; i < categoryObj.length; i++) {
            if (!categoryObj.values) {
                if (categoryValue == categoryObj[i].field) {
                    category = categoryObj[i];
                }
            }

        }
        if (subCategoryObj) {
            for (var i = 0; i < subCategoryObj.length; i++) {
                if (subCategoryValue == subCategoryObj[i].field) {
                    subCategory = subCategoryObj[i];
                }
            }
        }

        if (categoryValue !== undefined || subCategoryValue !== undefined) {
            for (var k in Objs) {
                for (var i = 0; i < Objs[k].fieldType.length; i++) {
                    if (subCategoryObj !== undefined && subCategoryValue !== undefined) {
                        if (Objs[k].fieldType[i] == equivalentInstance(subCategory.instance))
                            filteredObj[k] = Objs[k];
                    }

                    if (!categoryObj.values && Objs[k].fieldType[i] == equivalentInstance(category.instance)) {
                        filteredObj[k] = Objs[k];
                    }
                }
            }
        }

        return filteredObj;
    }
});