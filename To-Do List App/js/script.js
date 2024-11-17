let todos = JSON.parse(localStorage.getItem('todos')) || [];


function createConfetti(x, y) {
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.backgroundColor = [
            '#FF6B6B', '#4ECDC4', '#FFE66D'
        ][Math.floor(Math.random() * 3)];
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
    }
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();
    
    if (task) {
        const newTodo = {
            id: Date.now(),
            text: task,
            completed: false
        };
        
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        input.value = '';

      
        input.style.animation = 'none';
        input.offsetHeight; 
        input.style.animation = 'shake 0.5s ease-out';
    }
}

function toggleTask(id, event) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    const checkbox = event.target;
    const rect = checkbox.getBoundingClientRect();
    
    if (!todos.find(todo => todo.id === id).completed) {
        createConfetti(rect.left, rect.top);
    }
    
    todoItem.classList.add('task-complete-animation');
    
    setTimeout(() => {
        todos = todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        saveTodos();
        renderTodos();
    }, 300);
}

function deleteTask(id, event) {
    event.stopPropagation();
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    todoItem.style.transform = 'translateX(100%)';
    todoItem.style.opacity = '0';
    
    setTimeout(() => {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }, 300);
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    
    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">✨ No tasks yet. Add a task to get started! ✨</div>';
        return;
    }

    todoList.innerHTML = todos.map((todo, index) => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" 
             data-id="${todo.id}" 
             style="animation-delay: ${index * 0.1}s">
            <input 
                type="checkbox" 
                ${todo.completed ? 'checked' : ''} 
                onchange="toggleTask(${todo.id}, event)"
            >
            <span>${todo.text}</span>
            <button class="delete-btn" onclick="deleteTask(${todo.id}, event)">Delete</button>
        </div>
    `).join('');
}

renderTodos();
