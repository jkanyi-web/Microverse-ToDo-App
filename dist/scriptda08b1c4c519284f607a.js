/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/** @format */

var taskBox = document.querySelector('.task-box');
var tasks = [{
  description: 'Cook',
  completed: false,
  index: 0
}, {
  description: 'Watch tv',
  completed: false,
  index: 1
}, {
  description: 'Complete Project',
  completed: false,
  index: 2
}];
tasks.sort(function (a, b) {
  return a.index - b.index;
});
tasks.forEach(function (task) {
  var list = document.createElement('li');
  list.innerHTML = "\n          <label for=\"".concat(task.index, "\">\n            <input type=\"checkbox\" name=\"task\" id=\"").concat(task.index, "\">\n            <p>").concat(task.description, "</p>\n          </label>\n            <i class=\"fa-solid fa-ellipsis-vertical\"></i> \n              ");
  taskBox.append(list);
});
/******/ })()
;
//# sourceMappingURL=scriptda08b1c4c519284f607a.js.map