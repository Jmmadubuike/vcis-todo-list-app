let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <span>${task.name} - ${task.dueDate} - ${task.priority}</span>
        <button onclick="deleteTask(${task.id})">Delete</button>
        <button onclick="toggleTaskCompletion(${task.id})">Complete</button>
    `;
    return li;
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
}

document.getElementById('todo-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;
    const task = {
        id: Date.now(),
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };
    addTask(task);
    event.target.reset();
});

document.addEventListener('DOMContentLoaded', renderTasks);
