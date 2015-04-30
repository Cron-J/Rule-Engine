app.factory('rule', ['$resource', function($resource) {
	return $resource(':url/:id/:attribute_id', {},
		{
			'update': { method: 'PUT' },
			'save': { method: 'POST' },
			'delet': { method: 'DELETE' }
		});
}]);