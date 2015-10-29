/**
 * Created by Eswer on 10/28/2015.
 */


(function (object) {
    var collection = object;
    var attributes = [];
    this.filter = function () {
        if (object.attributeId === 'documentThumbnail' && object.value.endsWith('.jpg') {
            return 1;
        } else if (object.attributeId === 'length' && object.value === '12') {
            return 2;
        } else if (object.attributeId === 'width' && object.value === '10') {
            return 3;
        }
        return 0;
    };
    attribute = _.map(collection, this.filter());
    attribute = _.filter(attribute, function (n) {
        return n != 0;
    });
    return (_.uniq(attribute)).length === 3;
})