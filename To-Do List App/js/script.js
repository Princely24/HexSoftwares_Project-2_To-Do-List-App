 
 let todos = JSON.parse(localStorage.getItem('todos')) || [];

 renderTodos();

 // Handle Enter key press
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

         // Scroll to the new task
         setTimeout(() => {
             const todoList = document.getElementById('todoList');
             todoList.scrollTop = todoList.scrollHeight;
         }, 100);
     }
 }

 function toggleTask(id) {
     const todoItem = document.querySelector(`[data-id="${id}"]`);
     todoItem.classList.add('task-complete-animation');
     
     setTimeout(() => {
         todos = todos.map(todo => 
             todo.id === id ? {...todo, completed: !todo.completed} : todo
         );
         saveTodos();
         renderTodos();
     }, 300);
 }

 function deleteTask(id) {
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
         todoList.innerHTML = '<div class="empty-state">No tasks yet. Add a task to get started!</div>';
         return;
     }

     todoList.innerHTML = todos.map((todo, index) => `
         <div class="todo-item ${todo.completed ? 'completed' : ''}" 
              data-id="${todo.id}" 
              style="animation-delay: ${index * 0.1}s">
             <input 
                 type="checkbox" 
                 ${todo.completed ? 'checked' : ''} 
                 onchange="toggleTask(${todo.id})"
             >
             <span>${todo.text}</span>
             <button class="delete-btn" onclick="deleteTask(${todo.id})">Delete</button>
         </div>
     `).join('');
 }