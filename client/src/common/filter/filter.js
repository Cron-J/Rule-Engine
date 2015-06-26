app.filter('operatorsFilter', function() {
    return function(Objs, categoryValue, categoryObj) {
        var filteredObj = {};
        var category;
        if (categoryValue !== undefined && categoryValue.field !== undefined) {
            for (var i = 0; i < categoryObj[0].attributes.length; i++) {
                if (!categoryObj[0].attributes[i].attributes) {
                    if (categoryValue.field == categoryObj[0].attributes[i].field) {
                        category = categoryObj[0].attributes[i];
                    }
                } else {
                    for (var j = 0; j < categoryObj[0].attributes[i].attributes.length; j++) {
                        if (categoryValue.field ==  categoryObj[0].attributes[i].attributes[j].field) {
                            category = categoryObj[0].attributes[i].attributes[j];
                        }
                    }
                }

            }
            for (var k in Objs) {
                for (var i = 0; i < Objs[k].lhDataType.length; i++) {

                    if (Objs[k].lhDataType[i] == category.instance) {
                        filteredObj[k] = Objs[k];
                    }
                }
            }
        }

        return filteredObj;
    }
});
