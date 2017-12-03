function TodoController(TodoService) {

    const ctrl = this;
    const API = '';
    ctrl.newTodo = '';
    ctrl.list = [];

    // GET (R - retrieve)
    getTodos = () =>{
        TodoService
            .retrieve()
            .then(response => {
                ctrl.list = response;
            });
    };
    
    // POST (C - create)
    ctrl.addTodo = () => {
        if(!ctrl.newTodo) {
            return;
        }
        TodoService
            .create({
                title: ctrl.newTodo,
                completed: false
            })
            .then(response => {
                ctrl.list.unshift(response);
                ctrl.newTodo = '';
            });
    };

    // DELETE (D - delete)
    ctrl.removeTodo = (item, index) => {
        TodoService
            .remove(item)
            .then(response => {
                ctrl.list.splice(index, 1);
            });
    };

    // PUT (U - update)
    ctrl.updateTodo = (item, index) => {
        if(!item.title) {
            ctrl.removeTodo(item, index);
            return;
        }
        TodoService
            .update(item);
    };

    ctrl.getRemaining = () => {
        return ctrl.list.filter(item => {
            return !item.completed;
        });
    };

    ctrl.toggleState = (item) => {
        TodoService
            .update(item)
            .then(() => {

            }, () => {
                item.completed = !item.completed;
            });
    };

    getTodos();
}

TodoController.$inject = ['TodoService'];

angular
    .module('app')
    .controller('TodoController', TodoController);