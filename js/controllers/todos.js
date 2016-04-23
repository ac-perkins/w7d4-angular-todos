(function() {
    'use strict';

    angular
    .module('todos-angular')
    .controller("TodosController", TodosController);

    TodosController.$inject = ["todosFactory"];


    function TodosController(todosFactory) {
      console.log(todosFactory);

      this.allTodos = todosFactory.todos;

      // this.newTodo = todosFactory.newTodo;

      this.newTodo = { todo: '', completed: false, editing: false };

      console.log(this.allTodos);

      this.addNewTodo = function addNewTodo() {
        console.log('newTodo', this.newTodo);
        console.log(this.allTodos);
        this.allTodos.push(this.newTodo);
        this.newTodo = {todo: '', completed: false, editing: false};
        todosFactory.edit(this.allTodos);
      };

      this.completedTodo = function completedTodo() {
        todosFactory.edit(this.allTodos);
      };

      this.doneEditing = function doneEditing( event, todo ) {
        console.log(todo);
        if (event.keyCode === 13 || event.keyCode === 27) {
          todo.editing = false;
        }
        console.log(todo);
      };

      this.deleteTodo = function deleteTodo(i) {
        console.log(i);
        this.allTodos.splice(i, 1);
        todosFactory.edit(this.allTodos);
      };



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


      this.showAll = function showAll() {

        this.allActive = true;
        console.log(this.allActive);
        this.completedActive = false;
        this.activeActive = false;

        this.filter = false;
      };

      this.showActive = function showActive() {
        this.filter = {completed: false};

        this.allActive = false;
        this.completedActive = false;
        console.log(this.allActive);
        this.activeActive = true;
      };

      this.showCompleted = function showCompleted() {
        this.filter = {completed: true};

        this.allActive = false;
        this.completedActive = true;
        this.activeActive = false;
      };

      var that = this;

      this.clearCompleted = function clearCompleted() {
        this.allTodos.forEach(function loopTodos(element, i) {
          if (element.completed) {
            that.allTodos.splice(i, 1);
          }
        });
        todosFactory.edit(this.allTodos);
      };

    }

})();
