/** @format */

import './styles/main.css';

const taskBox = document.querySelector('.task-box');
const taskInput = document.querySelector('.task-input input');
const clearAll = document.querySelector('.clear-btn');

let editId;
let isEditedTask = false;
// getting localStorage todo-list
let todos = JSON.parse(localStorage.getItem('todo-list'));

const showTodo = (filter) => {
  let li = '';
  if (todos) {
    todos.forEach((todo, id) => {
      // if todo status is completed, set the isCompleted value to checked
      const isCompleted = todo.status === 'completed' ? 'checked' : '';
      if (filter === todo.status || filter === 'all') {
        li += `
          <li class="task">
            <label for="${id}">
              <input onclick="updateStatus(this)" type="checkbox" ${isCompleted} name="checkbox" id="${id}">
              <p class='${isCompleted}'>${todo.name}</p>
            </label>
            <div class="settings">
              <i id="ellipsis${id}" class="uil uil-ellipsis-h"></i>
              <ul class="task-menu">
                <li id="${id}${todo.name}"><i class="uil uil-pen"></i>Edit</li>
                <li id="${id}"><i class="uil uil-trash"></i>Delete</li>
              </ul>
            </div>
          </li>
        `;
      }
    });
  }
  taskBox.innerHTML = li || "<span>You don't have any tasks here yet</span>";
  // eslint-disable-next-line no-use-before-define
  addElliplistiners();
};
showTodo('all');

const showMe = document.querySelectorAll('.uil.uil-ellipsis-h');
for (let x = 0; x < showMe.length; x += 1) {
  showMe[x].onclick = () => {
    const taskMenu = showMe[x].parentElement.lastElementChild;
    taskMenu.classList.add('show');
    document.addEventListener('click', (e) => {
      // Removing show class from the task Menu on document click
      if (e.target.tagName !== 'I' || e.target !== showMe[x]) {
        taskMenu.classList.remove('show');
      }
    });
  };
}

function editTask() {
  const editTas = document.querySelectorAll('.task-menu');
  for (let i = 0; i < editTas.length; i += 1) {
    // eslint-disable-next-line no-loop-func
    editTas[i].firstElementChild.onclick = () => {
      const tname = editTas[i].parentElement.parentElement.firstElementChild.textContent.trim();
      editId = i;
      isEditedTask = true;
      taskInput.value = tname;
    };
  }
}
editTask();

function deleteTask() {
  const delTas = document.querySelectorAll('.task-menu');
  for (let k = 0; k < delTas.length; k += 1) {
    // eslint-disable-next-line no-loop-func
    delTas[k].lastElementChild.onclick = () => {
      todos.splice(k, 1);
      localStorage.setItem('todo-list', JSON.stringify(todos));
      showTodo('all');
    };
  }
}
deleteTask();

function addElliplistiners() {
  const showMe = document.querySelectorAll('.uil.uil-ellipsis-h');
  for (let x = 0; x < showMe.length; x += 1) {
    showMe[x].onclick = () => {
      const taskMenu = showMe[x].parentElement.lastElementChild;
      taskMenu.classList.add('show');
      document.addEventListener('click', (e) => {
        // Removing show class from the task Menu on document click
        if (e.target.tagName !== 'I' || e.target !== showMe[x]) {
          taskMenu.classList.remove('show');
        }
      });
      editTask();
      deleteTask();
    };
  }
}

clearAll.addEventListener('click', () => {
  // Removing all tasks from array/todos
  todos.splice(0, todos.length);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo('all');
});

// eslint-disable-next-line no-unused-vars
const updateStatus = (selectedTask) => {
  // getting paragraph that contains task name
  const taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    todos[selectedTask.id].status = 'completed';
  } else {
    taskName.classList.remove('checked');
    todos[selectedTask.id].status = 'pending';
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
};

taskInput.addEventListener('keyup', (e) => {
  const userTask = taskInput.value.trim();
  if (e.key === 'Enter' && userTask) {
    if (!isEditedTask) {
      // if edited task isn't true
      if (!todos) {
        // if todo-list doesn't exist, pass an empty array to todos
        todos = [];
      }

      const taskInfo = { name: userTask, status: 'pending' };
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
  addElliplistiners();
});
