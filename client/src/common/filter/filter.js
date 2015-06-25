// app.filter('instanceFilter', function() {
//     return function(Objs, categoryValue, categoryObj) {
//         var filteredObj = {};
//         var category;
//         var subCategory;

//         function equivalentInstance(ins) {
//             var equiInstanceObj = {
//                 'String': 'text',
//                 'Number': 'number',
//                 'undefined': 'none'
//             }

//             return equiInstanceObj[ins]
//         }
//         for (var i = 0; i < categoryObj.length; i++) {
//             if (!categoryObj.values) {
//                 if (categoryValue == categoryObj[i].field) {
//                     category = categoryObj[i];
//                 }
//             }

//         }
//         if (subCategoryObj) {
//             for (var i = 0; i < subCategoryObj.length; i++) {
//                 if (subCategoryValue == subCategoryObj[i].field) {
//                     subCategory = subCategoryObj[i];
//                 }
//             }
//         }

//         if (categoryValue !== undefined || subCategoryValue !== undefined) {
//             for (var k in Objs) {
//                 for (var i = 0; i < Objs[k].fieldType.length; i++) {
//                     if (subCategoryObj !== undefined && subCategoryValue !== undefined) {
//                         if (Objs[k].fieldType[i] == equivalentInstance(subCategory.instance))
//                             filteredObj[k] = Objs[k];
//                     }

//                     if (!categoryObj.values && Objs[k].fieldType[i] == equivalentInstance(category.instance)) {
//                         filteredObj[k] = Objs[k];
//                     }
//                 }
//             }
//         }

//         return filteredObj;
//     }
// });

// app.filter('subDocumentsFilter', function() {
//     return function(documents,key) {
//         var  filteredObj = {}; 
//         if(key.propertyId='product'){
//             filteredObj = documents;
//         }
//         //console.log(typeof(key));
//         else{
//             if(key.values){
//                 for(var i=0;i<key.values.length;i++)
//                 filteredObj = key.values[i].field;
//             }
//         //     for(var j=0;j<documents.length;j++){
//         //     if (documents[j].values) {
//         //         for (var i = 0; i < documents[j].values.length; i++) {
//         //             //console.log('documents[j].values[i].field',documents[j].values[i].field);
//         //             if (key == documents[j].field) {
                        
//         //               filteredObj =documents[j].values[i].field;
//         //               //console.log(filteredObj);
//         //             }
//         //         }
//         //     }
//         // }
//         }
        
                

//         console.log('filteredObj',filteredObj);
//         return filteredObj;
//     }
// });

// app.filter('groupBy', ['$parse', function ($parse) {
//     return function groupByFilter(input, groupByExpr) {
//       return _.groupBy(input, $parse(groupByExpr));
//     };
//   }]);