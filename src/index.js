/** @format */

const taskBox = document.querySelector('.task-box');

const tasks = [
  {
    description: 'Cook',
    completed: false,
    index: 0,
  },
  {
    description: 'Watch tv',
    completed: false,
    index: 1,
  },
  {
    description: 'Complete Project',
    completed: false,
    index: 2,
  },
];

tasks.sort((a, b) => a.index - b.index);

tasks.forEach((task) => {
  const list = document.createElement('li');

  list.innerHTML = `
          <label for="${task.index}">
            <input type="checkbox" name="task" id="${task.index}">
            <p>${task.description}</p>
          </label>
            <i class="fa-solid fa-ellipsis-vertical"></i> 
              `;
  taskBox.append(list);
});
