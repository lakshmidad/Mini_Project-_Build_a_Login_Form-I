// Task Manager with one high-impact feature: persistent tasks using localStorage
// Core behavior preserved; additions include persistence and initial render from storage.

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Storage helpers
const STORAGE_KEY = "tm_tasks_v1";
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Render helpers
function createTaskItem(task) {
  const li = document.createElement("li");
  if (task.done) li.classList.add("done");

  const span = document.createElement("span");
  span.textContent = task.text;
  span.onclick = () => {
    li.classList.toggle("done");
    task.done = !task.done;
    persistFromDOM();
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = () => {
    li.remove();
    persistFromDOM();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  return li;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return; // basic validation

  const task = { text: taskText, done: false };
  const li = createTaskItem(task);
  taskList.appendChild(li);
  taskInput.value = "";
  taskInput.focus();

  persistFromDOM();
}

function persistFromDOM() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map(li => ({
    text: li.querySelector("span").textContent,
    done: li.classList.contains("done")
  }));
  saveTasks(tasks);
}

function renderFromStorage() {
  const tasks = loadTasks();
  taskList.innerHTML = "";
  tasks.forEach(t => taskList.appendChild(createTaskItem(t)));
}

// Init
renderFromStorage();
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
