var attribute = function(array,identity){
  var reformattedArray = array.map(function(obj){
      obj['AttributeId'] = identity;
      return obj;
    });
  return reformattedArray;
};

var classification = function(array,identity){
  var reformattedArray = array.map(function(obj){
      obj['ClassificationId'] = identity;
      return obj;
    });
  return reformattedArray;
};

var classificationGroup = function(array, identity) {
  var reformattedArray = array.map(function(obj){
    obj['ClassificationGroupId'] = identity;
    return obj;
  });
  return reformattedArray;
};

var keyvalueExistsin = function(key, value, arrayOfObject) {
  for(var i = 0; i <arrayOfObject.length; i++) {
    var object = arrayOfObject[i];
    if(object[key] == value)
      return true;
  }
  return false;
}

/*
  Comman function to add AttributeSectionId to array JSON object.
*/
var attributeSection = function(array,identity){
  var reformattedArray = array.map(function(obj){
      obj['AttributeSectionId'] = identity;
      return obj;
    });
  return reformattedArray;
};

exports.attribute = attribute;
exports.attributeSection = attributeSection;
exports.classification = classification;
exports.keyvalueExistsin = keyvalueExistsin;
exports.classificationGroup = classificationGroup;
