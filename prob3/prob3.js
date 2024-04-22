const todoForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');

// Add Task
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskTitle = document.getElementById('task-title').value;
    const taskDetails = document.getElementById('task-details').value;
    if (taskTitle.trim() !== '') {
        addTask(taskTitle, taskDetails);
        todoForm.reset();
    }
});

function addTask(title, details) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${title}</strong>`;
    if (details.trim() !== '') {
        li.innerHTML += `<br>${details}`;
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', function() {
        const newTitle = prompt('Enter new title:', title);
        const newDetails = prompt('Enter new details:', details);
        if (newTitle !== null) {
            li.innerHTML = `<strong>${newTitle}</strong>`;
            if (newDetails !== null && newDetails.trim() !== '') {
                li.innerHTML += `<br>${newDetails}`;
            }
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
        }
    });

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
}
