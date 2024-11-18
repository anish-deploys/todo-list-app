// Task Data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
document.getElementById("add-task").addEventListener("click", () => {
  const taskInput = document.getElementById("new-task");
  const priority = document.getElementById("priority").value;

  if (taskInput.value.trim()) {
    tasks.push({ text: taskInput.value.trim(), priority, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
});

// Toggle Dark/Light Mode
const darkModeButton = document.getElementById("toggle-dark-mode");
darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeButton.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Bright Mode"
    : "🌙 Dark Mode";
});

// Search Task
document.getElementById("search-button").addEventListener("click", () => {
  const searchQuery = document.getElementById("search-task").value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery)
  );
  renderTasks(filteredTasks);
});

// Render Tasks
function renderTasks(taskList = tasks) {
  const incompleteTasks = document.querySelector("#incomplete-tasks ul");
  const completedTasks = document.querySelector("#completed-tasks ul");

  incompleteTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  taskList.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span>${task.text} (${task.priority.toUpperCase()})</span>
      <button class="complete">${task.completed ? "Undo" : "Complete"}</button>
      <button class="delete">Delete</button>
    `;

    (task.completed ? completedTasks : incompleteTasks).appendChild(taskItem);

    taskItem.querySelector(".complete").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    taskItem.querySelector(".delete").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
  });
}

// Save Tasks to LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial Render
renderTasks();
