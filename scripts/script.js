// script.js
let lists = [];

function createList() {
    const listName = prompt("Enter list name:");
    if (listName) {
        const newList = { name: listName, tasks: [] };
        lists.push(newList);
        renderLists();
    }
}

function addTask(listIndex) {
    const taskTitle = prompt("Enter task title:");
    if (taskTitle) {
        const taskDescription = prompt("Enter task description:");
        const dueDate = prompt("Enter due date:");
        const priority = prompt("Enter priority (high/medium/low):");
        const newTask = { title: taskTitle, description: taskDescription, dueDate: dueDate, priority: priority, completed: false };
        lists[listIndex].tasks.push(newTask);
        renderLists();
    }
}

function toggleTaskCompletion(listIndex, taskIndex) {
    lists[listIndex].tasks[taskIndex].completed = !lists[listIndex].tasks[taskIndex].completed;
    renderLists();
}

function renderLists() {
    const listsContainer = document.getElementById("lists");
    listsContainer.innerHTML = "";
    lists.forEach((list, listIndex) => {
        const listDiv = document.createElement("div");
        listDiv.classList.add("list");
        listDiv.innerHTML = `<h2>${list.name}</h2>`;
        list.tasks.forEach((task, taskIndex) => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            if (task.completed) {
                taskDiv.classList.add("complete");
            }
            taskDiv.innerHTML = `
                <input type="checkbox" onchange="toggleTaskCompletion(${listIndex}, ${taskIndex})" ${task.completed ? 'checked' : ''}>
                <strong>${task.title}</strong> - ${task.description} - Due: ${task.dueDate} - Priority: ${task.priority}
            `;
            listDiv.appendChild(taskDiv);
        });
        const addTaskButton = document.createElement("button");
        addTaskButton.textContent = "Add Task";
        addTaskButton.onclick = () => addTask(listIndex);
        listDiv.appendChild(addTaskButton);
        listsContainer.appendChild(listDiv);
    });
}

// Initial render
renderLists();
