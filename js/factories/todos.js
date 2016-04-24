(function() {
    'use strict';

    angular
    .module('todos-angular')
    .factory("todosFactory", todosFactory);

    var todos = [];

    if (!localStorage.getItem('todosKey')) {
      localStorage.setItem('todosKey', angular.toJson(todos));
    }

    /**
     * Updates localStorage with an array of todos
     * @param  {array} todos    Array of todos
     */
    function editTodos(todos) {
      localStorage.setItem('todosKey', angular.toJson(todos));
    }

    /**
     * Allows the todos array and the editTodos function to be injected into
     * angular controllers.
     * @return {object}
     */
    function todosFactory() {
      return {
        todos: JSON.parse(localStorage.getItem('todosKey')),
        edit: editTodos
      };
    }

})();
