document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector('.myInput');
    const addButton = document.querySelector('.addTask');
    const taskList = document.querySelector('.taskList');
    loadTasks();
    function createTaskElement(taskText, isDone = false) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.disabled = isDone; 
        checkbox.checked = isDone; 
        const span = document.createElement('span');
        span.textContent = taskText;
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.className = 'done';
        doneButton.addEventListener('click', function () {
            li.classList.toggle('done-task');
            checkbox.checked = !checkbox.checked;
            checkbox.disabled = checkbox.checked; 
            saveTasks();
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(li);
            saveTasks(); // local storage
        });
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', function () {
            const newTaskText = prompt('Edit your task:', span.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                span.textContent = newTaskText.trim();
                saveTasks(); 
            }
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(doneButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        return li;
    }
    function addTask() {
        const taskText = inputField.value.trim();
        if (taskText !== '') {
            const newTask = createTaskElement(taskText);
            taskList.appendChild(newTask);
            inputField.value = ''; 
            saveTasks(); 
        }
    }
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').textContent;
            const isDone = li.querySelector('.task-checkbox').checked;
            tasks.push({ text: taskText, done: isDone });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const newTask = createTaskElement(task.text, task.done);
            taskList.appendChild(newTask);
        });
    }
    addButton.addEventListener('click', addTask);
    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});


//     // Add task on button click
//     addButton.addEventListener('click', addTask);

//     // Add task on pressing Enter key
//     inputField.addEventListener('keypress', function (e) {
//         if (e.key === 'Enter') {
//             addTask();
//         }
//     });
// });


// let addButton = document.querySelector('.addTask');
// let taskInput = document.querySelector('.myInput');
// let taskList = document.querySelector('.taskList');
//  function createnewtask(taskText){
//     const newtask = document.createElement('li');
//     newTask.textContent = taskText;
//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Delete';
//     deleteButton.classList.add('deleteTask');
//     deleteButton.addEventListener('click', () => {
//     newTask.remove(); 
//     });
//  }

















