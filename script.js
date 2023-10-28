document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-button");
    const taskList = document.getElementById("task-list");
    const totalCount = document.getElementById("total-count");
    const completedCount = document.getElementById("completed-count");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to update task count
    function updateTaskCount() {
        totalCount.textContent = tasks.length;
        completedCount.textContent = tasks.filter(task => task.completed).length;
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <button class="delete-button">Delete</button>
            `;
            li.querySelector("input[type='checkbox']").addEventListener("change", () => {
                task.completed = !task.completed;
                updateTaskCount();
                saveTasksToLocalStorage();
            });
            li.querySelector(".delete-button").addEventListener("click", () => {
                tasks.splice(index, 1);
                renderTasks();
                updateTaskCount();
                saveTasksToLocalStorage();
            });
            taskList.appendChild(li);
        });
    }

    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event listener for adding a new task
    addButton.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (text !== "") {
            tasks.push({ text, completed: false });
            taskInput.value = "";
            renderTasks();
            updateTaskCount();
            saveTasksToLocalStorage();
        }
    });

    // Initial render
    renderTasks();
    updateTaskCount();
});
