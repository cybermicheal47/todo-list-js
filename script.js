// Array to store the todo-list
let mytodo = [];

// Todo constructor function
function todo(title, description, date, priority) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.priority = priority;
}

// Function to render the todo display
function render() {
  let tododisplay = document.getElementById("todo-body");
  tododisplay.innerHTML = "";

  // Iterate over each todo in the todo-list
  for (let i = 0; i < mytodo.length; i++) {
    let todo = mytodo[i];
    let todoel = document.createElement("tr");

    // Create table cells and populate them with todo-list information
    todoel.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td>${todo.date}</td>
      <td>${todo.priority}</td>
      <td><button onclick="editTodoItem(${i})">Edit</button></td>
      <td><button onclick="removetodo(${i})">Delete</button></td>
    `;

    // Append the todo row to the todo-list display table body
    tododisplay.appendChild(todoel);
  }
}

// Function to add a todo to the todo-list
function addtodo() {
  let title = document.querySelector("#title-input").value;
  let description = document.querySelector("#description-input").value;
  let date = document.querySelector("#due-date-input").value;
  let priority = document.querySelector("#priority-select").value || "No Priority"; // Default value when no priority is selected

  // Create a new todo instance
  let newtodo = new todo(title, description, date, priority);

  // Add the new todo to the todo-list array
  mytodo.push(newtodo);

  // Render the updated todo display
  render();

  // Store the updated data in localStorage
  storeData();
}

// Event listener for the form submission
document.querySelector("#todo-form").addEventListener("submit", function (event) {
  event.preventDefault();
  addtodo();
});

// Function to remove a todo from the todo-list
function removetodo(index) {
  mytodo.splice(index, 1);
  render();

  // Store the updated data in localStorage
  storeData();
}

// Function to edit a specific todo item
function editTodoItem(index) {
  let todo = mytodo[index];

  // Create the prompt modal
  let promptModal = document.createElement("div");
  promptModal.classList.add("prompt-modal");

  promptModal.innerHTML = `
    <div class="prompt-modal-content">
      <h2>Edit Todo</h2>
      <form id="editForm">
        <label for="newTitle">Title</label>
        <input type="text" id="newTitle" value="${todo.title}" required>
        <label for="newDescription">Description</label>
        <textarea id="newDescription" required>${todo.description}</textarea>
        <input type="date" id="newDate" value="${todo.date}" required>
        <label for="newPriority">Priority</label>
        <select id="newPriority">
          <option value="low" ${todo.priority === "low" ? "selected" : ""}>Low</option>
          <option value="medium" ${todo.priority === "medium" ? "selected" : ""}>Medium</option>
          <option value="high" ${todo.priority === "high" ? "selected" : ""}>High</option>
        </select>
        <button type="submit" onclick="saveTodoItem(${index})">Save</button>
      </form>
    </div>
  `;

  // Add the prompt modal to the document
  document.body.appendChild(promptModal);
}

// Function to save the edited todo item
function saveTodoItem(index) {
  let newTitle = document.querySelector("#newTitle").value;
  let newDescription = document.querySelector("#newDescription").value;
  let newDate = document.querySelector("#newDate").value;
  let newPriority = document.querySelector("#newPriority").value;

  // Update the properties of the todo item with the new values
  mytodo[index].title = newTitle;
  mytodo[index].description = newDescription;
  mytodo[index].date = newDate;
  mytodo[index].priority = newPriority;

  // Remove the prompt modal
  let promptModal = document.querySelector(".prompt-modal");
  document.body.removeChild(promptModal);

  // Render the updated todo display
  render();

  // Store the updated data in localStorage
  storeData();
}

// Storing data in localStorage
function storeData() {
  // Assuming mytodo is the array containing your todo items
  localStorage.setItem("mytodo", JSON.stringify(mytodo));
}

// Call the storeData() function whenever you want to store the data

// Retrieving data from localStorage
function retrieveData() {
  let storedData = localStorage.getItem("mytodo");

  // Check if data exists in localStorage
  if (storedData) {
    mytodo = JSON.parse(storedData);
    render(); // Update the display with the retrieved data
  }
}

// Call the retrieveData() function whenever you want to retrieve the stored data

// Event listener for page load
window.addEventListener("load", function () {
  retrieveData();
});
