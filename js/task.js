// Task list data
let tasks = [];

// Function to render task list
function renderTaskList() {
  const taskListBody = document.getElementById('task-list-body');
  taskListBody.innerHTML = '';
  tasks.forEach((task) => {
    const taskRow = document.createElement('tr');
    taskRow.innerHTML = `
      <td>${task.name}</td>
      <td>${task.assignee}</td>
      <td>${task.dueDate}</td>
      <td>${task.status}</td>
      <td>
        <button class="edit-task-btn" data-task-id="${task.id}">Edit</button>
        <button class="delete-task-btn" data-task-id="${task.id}">Delete</button>
      </td>
    `;
    taskListBody.appendChild(taskRow);
  });
}

// Function to handle create new task form submission
function handleCreateTaskFormSubmission(event) {
  event.preventDefault();
  const taskNameField = document.getElementById('task-name-field');
  const assigneeDropdown = document.getElementById('assignee-dropdown');
  const dueDateSelector = document.getElementById('due-date-selector');
  const prioritySelector = document.getElementById('priority-selector');
  const newTask = {
    id: tasks.length + 1,
    name: taskNameField.value,
    assignee: assigneeDropdown.value,
    dueDate: dueDateSelector.value,
    priority: prioritySelector.value,
    status: 'Pending'
  };
  tasks.push(newTask);
  renderTaskList();
  taskNameField.value = '';
  assigneeDropdown.value = '';
  dueDateSelector.value = '';
  prioritySelector.value = '';
}

// Function to handle edit task form submission
function handleEditTaskFormSubmission(event) {
  event.preventDefault();
  const taskId = event.target.dataset.taskId;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    const task = tasks[taskIndex];
    const taskNameField = document.getElementById('task-name-field');
    const assigneeDropdown = document.getElementById('assignee-dropdown');
    const dueDateSelector = document.getElementById('due-date-selector');
    const prioritySelector = document.getElementById('priority-selector');
    task.name = taskNameField.value;
    task.assignee = assigneeDropdown.value;
    task.dueDate = dueDateSelector.value;
    task.priority = prioritySelector.value;
    renderTaskList();
  }
}

// Function to handle delete task button click
function handleDeleteTaskButtonClick(event) {
  const taskId = event.target.dataset.taskId;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTaskList();
  }
}

// Function to handle task filter changes
function handleTaskFilterChanges() {
  const assigneeFilter = document.getElementById('assignee-filter');
  const priorityFilter = document.getElementById('priority-filter');
  const statusFilter = document.getElementById('status-filter');
  const dateRangeFilter = document.getElementById('date-range-filter');
  const filteredTasks = tasks.filter((task) => {
    const assigneeMatches = assigneeFilter.value === '' || task.assignee === assigneeFilter.value;
    const priorityMatches = priorityFilter.value === '' || task.priority === priorityFilter.value;
    const statusMatches = statusFilter.value === '' || task.status === statusFilter.value;
    const dateRangeMatches = dateRangeFilter.value === '' || task.dueDate >= dateRangeFilter.value;
    return assigneeMatches && priorityMatches && statusMatches && dateRangeMatches;
  });
  renderTaskList(filteredTasks);
}

// Function to handle task search
function handleTaskSearch() {
  const taskSearchBar = document.getElementById('task-search-bar');
  const searchQuery = taskSearchBar.value.toLowerCase();
  const filteredTasks = tasks.filter((task) => {
    return task.name.toLowerCase().includes(searchQuery) || task.assignee.toLowerCase().includes(searchQuery);
  });
  renderTaskList(filteredTasks);
}

// Event listeners
document.getElementById('create-new-task-btn').addEventListener('click', () => {
  document.querySelector('.create-task-form').style.display = 'block';
});

document.getElementById('submit-task-btn').addEventListener('click', handleCreateTaskFormSubmission);

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-task-btn')) {
    const taskId = event.target.dataset.taskId;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      const task = tasks[taskIndex];
      document.querySelector('.edit-task-form').style.display = 'block';
      document.getElementById('task-name-field').value = task.name;
      document.getElementById('assignee-dropdown').value = task.assignee;
      document.getElementById('due-date-selector').value = task.dueDate;
      document.getElementById('priority-selector').value = task.priority;
    }
  } else if (event.target.classList.contains('delete-task-btn')) {
    handleDeleteTaskButtonClick(event);
  }
});

document.getElementById('assignee-filter').addEventListener('change', handleTaskFilterChanges);
document.getElementById('priority-filter').addEventListener('change', handleTaskFilterChanges);
document.getElementById('status-filter').addEventListener('change', handleTaskFilterChanges);
document.getElementById('date-range-filter').addEventListener('change', handleTaskFilterChanges);

document.getElementById('task-search-bar').addEventListener('input', handleTaskSearch);

// Initialize task list
renderTaskList();