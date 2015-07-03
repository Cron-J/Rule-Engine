app.factory('rule', ['$resource', function($resource) {
	return $resource(':url/:id/:attribute_id', {id: "@id"},
		{
			'update': { method: 'PUT' },
			'save': { method: 'POST' },
			'get': { method: 'GET',isArray:true},
			'getbyId': { method: 'GET'},
			'delet': { method: 'DELETE' }
		});
}]);