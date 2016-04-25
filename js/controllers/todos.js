(function() {
    'use strict';

    angular
    .module('todos-angular')
    .controller("TodosController", TodosController);

    TodosController.$inject = ["todosFactory"];


    function TodosController(todosFactory) {

      this.allTodos = todosFactory.todos;

      this.newTodo = { todo: '', completed: false, editing: false };

      /**
       * Takes the input from the todoForm if it is valid and adds it as a new
       * entry to the allTodos array. It then resets the newTodo object and updates
       * localStorage.
       */
      this.addNewTodo = function addNewTodo(form) {
        if (form.$valid) {
          this.allTodos.push(this.newTodo);
          this.newTodo = {todo: '', completed: false, editing: false};
          todosFactory.edit(this.allTodos);
        }
      };

      /**
       * Updates localStorage when completed button is clicked in the UI.
       */
      this.completedTodo = function completedTodo() {
        todosFactory.edit(this.allTodos);
      };

      /**
       * Sets a todo's editing value to false when the enter or escape keys are
       * hit while editing the todo.
       * @param  {object} event   The current keyboard key being pressed
       * @param  {object} todo    The todo object that is being edited
       */
      this.doneEditing = function doneEditing(event, todo) {
        if (event.keyCode === 13 || event.keyCode === 27) {
          todo.editing = false;
        }
      };

      /**
       * Takes in the index number from the allTodos array and removes it from
       * the array, then updates localStorage with the resulting array.
       * @param  {number} i   index number from the allTodos array
       */
      this.deleteTodo = function deleteTodo(i) {
        this.allTodos.splice(i, 1);
        todosFactory.edit(this.allTodos);
      };

      /**
       * Implements a counter that increments based on a todo's completed status
       * and then returns that number to display the number of incomplete todos.
       * @return {number}   Number of incomplete todos
       */
      this.itemsLeft = function itemsLeft() {
        var itemsLeftCount = 0;
        this.allTodos.forEach(function loopTodos(element) {
          if (!element.completed) {
            itemsLeftCount++;
          }
        });
        return itemsLeftCount;
      };

      this.allActive = true;
      this.completedActive = false;
      this.activeActive = false;

      /**
       * Displays all objects in allTodos array regardless of status when "All"
       * is clicked in the UI.
       */
      this.showAll = function showAll() {
        this.filter = false;

        this.allActive = true;
        this.completedActive = false;
        this.activeActive = false;
      };

      /**
       * Displays only the objects in the allTodos array that are not completed
       * when "Active" is clicked in the UI.
       */
      this.showActive = function showActive() {
        this.filter = {completed: false};

        this.allActive = false;
        this.completedActive = false;
        this.activeActive = true;
      };

      /**
       * Displays only the objects in the allTodos array that are completed when
       * "Completed" is clicked in the UI.
       */
      this.showCompleted = function showCompleted() {
        this.filter = {completed: true};

        this.allActive = false;
        this.completedActive = true;
        this.activeActive = false;
      };

      /**
       * Removes all todo objects in the array that have their completed
       * key set to true and then updates localStorage with the resulting array.
       * @param  {array} todos  Array of todo objects
       */
      this.clearCompleted = function clearCompleted(todos) {
        for (var i = todos.length - 1; i >= 0; i -= 1) {
          if (todos[i].completed) {
            todos.splice(i, 1);
          }
        }
        todosFactory.edit(todos);
      };

    }

})();
