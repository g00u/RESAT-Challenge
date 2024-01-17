let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const dueDateInput = document.getElementById("dueDateInput");

    if (taskInput.value.trim() === "") {
        alert("할 일을 입력하세요.");
        return;
    }

    const task = {
        text: taskInput.value,
        priority: prioritySelect.value,
        dueDate: dueDateInput.value,
        completed: false,
    };

    tasks.push(task);
    renderTasks();
    
    taskInput.value = "";
    dueDateInput.value ="";
}

function renderTasks() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("todo-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleCompleted(index));

        const textElement = document.createElement("div");
        textElement.innerText = task.text;
        if(task.completed){
            textElement.classList.add("completed");
        }
        const dueDateElement = document.createElement("div");
        dueDateElement.innerText = task.dueDate;

        const priorityElement = document.createElement("div");
        priorityElement.classList.add("priority");
        priorityElement.innerText = task.priority;

        const editButton = document.createElement("button");
        editButton.innerText = "수정";
        editButton.addEventListener("click", () => editTask(index));

        taskElement.appendChild(checkbox);
        taskElement.appendChild(textElement);
        taskElement.appendChild(dueDateElement)
        taskElement.appendChild(priorityElement);
        taskElement.appendChild(editButton);

        todoList.appendChild(taskElement);
    });
}

function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function editTask(index) {
    const newText = prompt("수정할 내용을 입력하세요.", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        renderTasks();
    }
}

function showAll() {
    renderTasks();
}

function showCompleted() {
    const completedTasks = tasks.filter(task => task.completed);
    renderFilteredTasks(completedTasks);
}

function showUncompleted() {
    const uncompletedTasks = tasks.filter(task => !task.completed);
    renderFilteredTasks(uncompletedTasks);
}

function renderFilteredTasks(filteredTasks) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("todo-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleCompleted(index));

        const textElement = document.createElement("div");
        textElement.innerText = task.text;

        const priorityElement = document.createElement("div");
        priorityElement.classList.add("priority");
        priorityElement.innerText = task.priority;

        const editButton = document.createElement("button");
        editButton.innerText = "수정";
        editButton.addEventListener("click", () => editTask(index));

        taskElement.appendChild(checkbox);
        taskElement.appendChild(textElement);
        taskElement.appendChild(priorityElement);
        taskElement.appendChild(editButton);

        todoList.appendChild(taskElement);
        if(index < tasks.length -1){
            const divider = document.createElement("hr");
            todoList.appendChild(divider)
        }
    });
}

