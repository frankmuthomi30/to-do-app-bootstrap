// Task object
class Task {
  constructor(title, important) {
    this.title = title;
    this.important = important;
  }
}

// Global array to store tasks
let tasks = [];

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to retrieve tasks from local storage
function loadTasks() {
  const tasksData = JSON.parse(localStorage.getItem('tasks'));
  if (tasksData) {
    tasks = tasksData;
  }
}

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById('taskList');
  if (!taskList) {
    return;
  }
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5>${task.title}</h5>
          <span class="badge ${task.important ? 'badge-danger' : 'badge-secondary'}">
            ${task.important ? 'Important' : 'Normal'}
          </span>
        </div>
        <div>
          <button class="btn btn-sm btn-primary edit-task" data-index="${index}">Edit</button>
          <button class="btn btn-sm btn-danger delete-task" data-index="${index}">Delete</button>
        </div>
      </div>
    `;

    taskList.appendChild(listItem);
  });

  // Attach event listeners to edit and delete buttons
  const editButtons = document.getElementsByClassName('edit-task');
  const deleteButtons = document.getElementsByClassName('delete-task');

  Array.from(editButtons).forEach(button => {
    button.addEventListener('click', handleEditTask);
  });

  Array.from(deleteButtons).forEach(button => {
    button.addEventListener('click', handleDeleteTask);
  });
}

// Function to handle task creation
function handleCreateTask(event) {
  event.preventDefault();

  const taskInput = document.getElementById('taskInput');
  const importantCheckbox = document.getElementById('importantCheckbox');
  const notification = document.getElementById('notification');

  const newTask = new Task(taskInput.value, importantCheckbox.checked);
  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = '';
  importantCheckbox.checked = false;

  notification.textContent = 'Task created successfully!';
  notification.style.display = 'block';
  setTimeout(function() {
    notification.style.display = 'none';
  }, 3000);
}

// Function to handle editing a task
function handleEditTask(event) {
  const index = event.target.getAttribute('data-index');
  const newTitle = prompt('Enter new task title:');

  if (newTitle) {
    tasks[index].title = newTitle;
    saveTasks();
    renderTasks();
  }
}

// Function to handle deleting a task
function handleDeleteTask(event) {
  const index = event.target.getAttribute('data-index');

  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Load tasks on page load
loadTasks();

// Attach event listener to the create task form submission
const createTaskForm = document.getElementById('createTaskForm');
if (createTaskForm) {
  createTaskForm.addEventListener('submit', handleCreateTask);
}

// Render tasks on initial page load
renderTasks();
