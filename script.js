document.addEventListener('DOMContentLoaded', loadTasks);

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Будь ласка, введіть завдання!');
        return;
    }

    try {
        const response = await fetch('http://localhost:9345/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText })
        });
        if (!response.ok) throw new Error('failed to add task');
        taskInput.value = '';
        loadTasks();
    } catch (err) {
        console.error('error adding task:', err);
        alert('Помилка при додаванні завдання');
    }
}

async function toggleTask(id) {
    try {
        const task = await getTask(id);
        const response = await fetch(`http://localhost:9345/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !task.completed })
        });
        if (!response.ok) throw new Error('failed to toggle task');
        loadTasks();
    } catch (err) {
        console.error('error toggling task:', err);
        alert('Помилка при оновленні завдання');
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`http://localhost:9345/api/tasks/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('failed to delete task');
        loadTasks();
    } catch (err) {
        console.error('error deleting task:', err);
        alert('Помилка при видаленні завдання');
    }
}

async function getTask(id) {
    const response = await fetch('http://localhost:9345/api/tasks');
    const tasks = await response.json();
    return tasks.find(t => t._id === id);
}

async function loadTasks() {
    try {
        const response = await fetch('http://localhost:9345/api/tasks');
        if (!response.ok) throw new Error('failed to fetch tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (err) {
        console.error('error loading tasks:', err);
        alert('Помилка при завантаженні завдань');
    }
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            <div>
                <input 
                    type="checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask('${task._id}')"
                >
                <span>${task.text}</span>
            </div>
            <button onclick="deleteTask('${task._id}')">
                Видалити
            </button>
        `;
        taskList.appendChild(li);
    });
}