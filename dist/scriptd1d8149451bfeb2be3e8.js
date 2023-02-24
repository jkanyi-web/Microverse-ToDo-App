/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/* eslint-disable no-unused-vars */
/** @format */

var taskBox = document.querySelector('.task-box');
var taskInput = document.querySelector('.task-input input');
var clearAll = document.querySelector('.clear-btn');
var editId;
var isEditedTask = false;
// getting localStorage todo-list
var todos = JSON.parse(localStorage.getItem('todo-list'));
var showTodo = function showTodo(filter) {
  var li = '';
  if (todos) {
    todos.forEach(function (todo, id) {
      // if todo status is completed, set the isCompleted value to checked
      var isCompleted = todo.status === 'completed' ? 'checked' : '';
      if (filter === todo.status || filter === 'all') {
        li += "\n          <li class=\"task\">\n            <label for=\"".concat(id, "\">\n              <input onclick=\"updateStatus(this)\" type=\"checkbox\" ").concat(isCompleted, " name=\"checkbox\" id=\"").concat(id, "\">\n              <p class='").concat(isCompleted, "'>").concat(todo.name, "</p>\n            </label>\n            <div class=\"settings\">\n              <i onclick=\"showMenu(this)\" class=\"uil uil-ellipsis-h\"></i>\n              <ul class=\"task-menu\">\n                <li onclick=\"editTask(").concat(id, ", '").concat(todo.name, "')\"><i class=\"uil uil-pen\"></i>Edit</li>\n                <li onclick=\"deleteTask(").concat(id, ")\"><i class=\"uil uil-trash\"></i>Delete</li>\n              </ul>\n            </div>\n          </li>\n        ");
      }
    });
  }
  taskBox.innerHTML = li || "<span>You don't have any tasks here yet</span>";
};
showTodo('all');
var showMenu = function showMenu(selectedTask) {
  // Getting task menu div
  var taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add('show');
  document.addEventListener('click', function (e) {
    // Removing show class from the task Menu on document click
    if (e.target.tagName !== 'I' || e.target !== selectedTask) {
      taskMenu.classList.remove('show');
    }
  });
};
var editTask = function editTask(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
};
var deleteTask = function deleteTask(deleteId) {
  // Removing selected task from array/todos
  todos.splice(deleteId, 1);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo('all');
};
clearAll.addEventListener('click', function () {
  // Removing all tasks from array/todos
  todos.splice(0, todos.length);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo('all');
});
var updateStatus = function updateStatus(selectedTask) {
  // getting paragraph that contains task name
  var taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    todos[selectedTask.id].status = 'completed';
  } else {
    taskName.classList.remove('checked');
    todos[selectedTask.id].status = 'pending';
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
};
taskInput.addEventListener('keyup', function (e) {
  var userTask = taskInput.value.trim();
  if (e.key === 'Enter' && userTask) {
    if (!isEditedTask) {
      // if edited task isn't true
      if (!todos) {
        // if todo-list doesn't exist, pass an empty array to todos
        todos = [];
      }
      var taskInfo = {
        name: userTask,
        status: 'pending'
      };
      // adding a new task to todos
      todos.push(taskInfo);
    } else {
      isEditedTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = '';
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo('all');
  }
});
/******/ })()
;
//# sourceMappingURL=scriptd1d8149451bfeb2be3e8.js.map