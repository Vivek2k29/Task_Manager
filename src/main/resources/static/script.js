const API_URL = 'http://localhost:8080/tasks';

document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  fetch(API_URL)
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';

      tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.backgroundColor = '#dc3545';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '4px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.onclick = () => {
          if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
            deleteTask(task.id);
          }
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    })
    .catch(err => console.error('Error loading tasks:', err));
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const title = taskInput.value.trim();

  if (!title) return alert('Task cannot be empty');

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
    .then(() => {
      taskInput.value = '';
      loadTasks();
    })
    .catch(err => console.error('Error adding task:', err));
}

function deleteTask(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => loadTasks())
    .catch(err => console.error('Error deleting task:', err));
}
