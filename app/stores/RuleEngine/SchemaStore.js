import alt from 'altInstance';

class SchemaStore {
  constructor() {
    this.schema = {'product': {
         'tenantId': {
           'index': true,
           'isRequired': true,
           'instance': 'String'
         },
         'productId': {
           'index': {
           'unique': true,
             'background': true
            },
           'isRequired': true,
           'instance': 'String'
         },
         'attributeValues': {
           'attributes': {
             'variantId': {
               'index': null,
               'instance': 'String'
             },
             'classificationId': {
               'index': null,
               'isRequired': true,
               'instance': 'String'
             }
           }
         }
        }
      };
  }
}

export default alt.createStore(SchemaStore, 'SchemaStore');
