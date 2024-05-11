// Function to create a new to-do list
function newList() {
  var listName = document.getElementById("listNameInput").value;
  if (listName === '') {
    alert("Please enter a list name!");
    return;
  }

  var newListDiv = document.createElement("div");
  newListDiv.className = "todo-list";
  newListDiv.innerHTML = `
    <div class="header">
      <h2 contenteditable="true">${listName}</h2> <!-- Allow list name to be edited -->
      <input type="text" class="taskInput" placeholder="Add Task...">
      <input type="text" class="descriptionInput" placeholder="Description...">
      <input type="date" class="dueDateInput">
      <span class="addBtn" onclick="newTask(this)"><img src="images/add-icon.png" alt="Add Task"></span>
      <span class="deleteBtn" onclick="deleteList(this)"><img src="images/delete-icon.png" alt="Delete List"></span>
    </div>
    <ul class="taskList"></ul>
  `;

  document.getElementById("listsContainer").appendChild(newListDiv);
  document.getElementById("listNameInput").value = "";
}

// Function to edit the title of a list
function editList(editBtn) {
  var listNameElement = editBtn.parentElement.querySelector('h2');
  listNameElement.focus(); // Focus on the list name to enable editing
}

// Function to delete a to-do list
function deleteList(deleteBtn) {
  var listDiv = deleteBtn.parentElement.parentElement;
  listDiv.remove();
}

// Function to create a new task within a list
function newTask(addBtn) {
  var listDiv = addBtn.parentElement.parentElement;
  var taskInput = listDiv.querySelector(".taskInput");
  var descriptionInput = listDiv.querySelector(".descriptionInput");
  var dueDateInput = listDiv.querySelector(".dueDateInput");
  var taskList = listDiv.querySelector(".taskList");

  var taskName = taskInput.value;
  var description = descriptionInput.value;
  var dueDate = dueDateInput.value;

  var task = {
    title: taskName,
    description: description,
    dueDate: dueDate
  };

  var taskInfo = taskName;
  if (description !== '') {
    taskInfo += ' - ' + description;
  }
  if (dueDate !== '') {
    taskInfo += ' (Due: ' + dueDate + ')';
  }

  var li = document.createElement("li");
  li.textContent = taskInfo;

  if (taskName === '') {
    alert("You must enter a task name!");
    return;
  }

  // Add click event listener to mark task as done, excluding clicks on the edit button
  li.addEventListener("click", function(event) {
    if (!event.target.closest('.editBtn')) { // Makes sure the task isn't crossed out while editing it
      this.classList.toggle('checked');
    }
  });

  // Create edit button
  var editBtn = document.createElement("span");
  editBtn.className = "editBtn";
  editBtn.innerHTML = '<img src="images/edit-icon.png" alt="Edit Task">';
  editBtn.onclick = function() {
    editTask(task, li);
  };

  // Create delete button with a unique class
  var deleteBtn = document.createElement("span");
  deleteBtn.className = "deleteBtnTask"; // Add a unique class for the delete button
  deleteBtn.innerHTML = '<img src="images/delete-icon.png" alt="Delete Task">';
  deleteBtn.onclick = function() {
    li.remove();
  };

  // Append buttons to the task item
  li.appendChild(deleteBtn); // Add delete button first
  li.appendChild(editBtn); // Add edit button next

  taskList.appendChild(li);

  taskInput.value = "";
  descriptionInput.value = "";
  dueDateInput.value = "";
}

// Function to edit a task
function editTask(task, taskElement) {
  var updatedTaskTitle = prompt("Edit task title:", task.title);
  if (updatedTaskTitle === null || updatedTaskTitle === '') {
    return; // If the user cancels or doesn't enter a task title, do nothing
  }

  var updatedDescription = prompt("Edit description:", task.description);
  var updatedDueDate = prompt("Edit due date (YYYY-MM-DD):", task.dueDate);

  task.title = updatedTaskTitle;
  task.description = updatedDescription;
  task.dueDate = updatedDueDate;

  // Store the existing edit and delete buttons
  var existingEditBtn = taskElement.querySelector('.editBtn');
  var existingDeleteBtn = taskElement.querySelector('.deleteBtnTask');

  var taskInfo = updatedTaskTitle;
  if (updatedDescription !== '') {
    taskInfo += ' - ' + updatedDescription;
  }
  if (updatedDueDate !== '') {
    taskInfo += ' (Due: ' + updatedDueDate + ')';
  }

  taskElement.textContent = taskInfo;

  // Re-add the existing edit and delete buttons
  if (existingDeleteBtn) {
    taskElement.appendChild(existingDeleteBtn);
  }
  if (existingEditBtn) {
    taskElement.appendChild(existingEditBtn);
  }
}