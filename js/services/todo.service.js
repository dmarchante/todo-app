function TodoService($http) {

    const API = '//jsonplaceholder.typicode.com/todos/';

    // POST
    create = (todo) => {
        return $http.post(API, todo).then(response => {
            return response.data;
        });
    };

    // GET
    retrieve = () => {
        return $http.get(API).then(response => {
            return response.data.splice(0, 10);
        });
    };

    // PUT
    update = (todo) => {
        return $http.put(API + todo.id).then(response => {
            return response.data;
        });
    };
    
    // DELETE
    remove = (todo) => {
        return $http.delete(API + todo.id).then(response => {
            return response.data;
        })
    };

    return {
        create: create,
        retrieve: retrieve,
        update: update,
        remove: remove
    };
}

TodoService.$inject = ['$http'];

angular
    .module('app')
    .factory('TodoService', TodoService);