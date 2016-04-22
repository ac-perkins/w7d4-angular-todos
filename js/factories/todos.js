(function() {
    'use strict';

    angular
    .module('todos-angular')
    .factory("todosFactory", todosFactory);

    var todos = [];

    var newTodo = {
      todo: '',
      completed: false,
      editing: false
    };


    if (!localStorage.getItem('todosKey')) {
      console.log("Updating storage");
      localStorage.setItem('todosKey', angular.toJson(todos));
    }

    function editTodos(todos) {
      console.log("should save", todos);
      localStorage.setItem('todosKey', angular.toJson(todos));
    }

    // function deleteTodo(todos) {
    //   localStorage.setItem('todosKey', angular.toJson(todos));
    // }

    // function inventoryFactory() {
    //   console.log('running the factory');
    //   return {
    //     data: JSON.parse(localStorage.getItem('todosKey')),
    //     save: saveAllItem,
    //     tax: tax
    //   };
    // }


    function todosFactory() {
      return {
        todos: JSON.parse(localStorage.getItem('todosKey')),
        newTodo: newTodo,
        edit: editTodos,
      };
    }

})();
