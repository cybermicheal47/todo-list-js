// Array to store todo-list 
let mytodo = [];


// todo constructor function
function todo(title, description, date, priority) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.priority = priority;
}



// Function to render the library display
function render() {
    let tododisplay = document.getElementById("todo-body");
    tododisplay.innerHTML = "";
  
    // Iterate over each book in the library
    for (let i = 0; i < mytodo.length; i++) {
      let todo = mytodo[i];
      let todoel = document.createElement("tr");
  
      // Create table cells and populate them with book information
      todoel.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td>${todo.date}</td>
        <td>${todo.priority}</td>
        <td><button onclick="editTodoItem(${i})">Edit</button></td>
        <td><button onclick="removetodo(${i})">Delete</button></td>
      `;
  
      // Append the book row to the library display table body
      tododisplay.appendChild(todoel);
    }
  }



// Function to add a book to the library
function addtodo() {
    let  title = document.querySelector("#title-input").value;
    let description = document.querySelector("#description-input").value;
    let date = document.querySelector("#due-date-input").value;
   let priority = document.querySelector("#priority-select").value || "No Priority"; // Default value when no priority is selected
  
    // Create a new book instance 
    let newtodo = new todo(title, description, date, priority);
  
    // Add the new book to the library array
    mytodo.push(newtodo);
  
    // Render the updated library display
    render();
  }






  // Event listener for the form submission
document.querySelector("#todo-form").addEventListener('submit', function(event) {
    event.preventDefault();
    addtodo();
  });


  // Function to remove a book from the library
function removetodo(index) {
    mytodo.splice(index, 1);
    render();
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

  // Render the updated todo list
  render();
}

