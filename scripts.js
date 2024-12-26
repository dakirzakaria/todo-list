"use strict";

// DOM ELEMENTS:
const addNewTask = document.querySelector("#add-new-task");
const newTaskName = document.querySelector("#new-task-name");
const tasksCount = document.querySelector("#tasks-count");
const completedTasksCount = document.querySelector("#completed-tasks-count");
const tasksList = document.querySelector("#tasks-list");

// DATA:
let TASKS_ARRAY = JSON.parse(localStorage.getItem("TASKS")) || [
  {
    id: 1,
    name: "Buy Bananas for the pancakes",
    isChecked: true,
  },
  {
    id: 2,
    name: "Go to the Gym Sports",
    isChecked: true,
  },
  {
    id: 3,
    name: "Prepare roadmap for MVP Work",
    isChecked: false,
  },
  {
    id: 4,
    name: "Call Peter Work",
    isChecked: false,
  },
  {
    id: 5,
    name: "Read chapter 3 from Math book Study",
    isChecked: false,
  },
];

// FUNCTIONS:
const saveDataToLocalStorage = () => {
  localStorage.setItem("TASKS", JSON.stringify(TASKS_ARRAY));
};

const duplicateTask = (name) => {
  return TASKS_ARRAY.find(
    (task) =>
      task.name.toLowerCase().replace(/\s+/g, "-") ===
      name.toLowerCase().replace(/\s+/g, "-")
  );
};

const updateTasksCount = () => {
  tasksCount.textContent = TASKS_ARRAY.length;
};
updateTasksCount();

const updateCompletedTasksCount = () => {
  if (TASKS_ARRAY.length > 0) {
    const completedTasksCountText = `${
      TASKS_ARRAY.filter((task) => task.isChecked).length
    } of ${TASKS_ARRAY.length}`;
    completedTasksCount.textContent = completedTasksCountText;
  } else {
    completedTasksCount.textContent = TASKS_ARRAY.filter(
      (task) => task.isChecked
    ).length;
  }
};
updateCompletedTasksCount();

const toggleTaskCompletion = (taskId) => {
  const task = TASKS_ARRAY.find((task) => task.id === taskId);
  if (task) {
    task.isChecked = !task.isChecked;
  }
  saveDataToLocalStorage();
  updateCompletedTasksCount();
  renderTasks();
};

const deleteTask = (taskId) => {
  const task = TASKS_ARRAY.find((task) => task.id === taskId);
  if (task) {
    const isConfirmed = confirm(
      `Are you sure you want to delete the task: "${task.name}"?`
    );
    if (isConfirmed) {
      TASKS_ARRAY = TASKS_ARRAY.filter((task) => task.id !== taskId);
      saveDataToLocalStorage();
      updateCompletedTasksCount();
      renderTasks();
      updateTasksCount();
    }
  }
};

const renderTasks = () => {
  tasksList.innerHTML = "";
  if (TASKS_ARRAY.length > 0) {
    TASKS_ARRAY.forEach((task) => {
      let taskItem = document.createElement("li");
      if (task.isChecked) {
        taskItem.classList.add("border-c-gray-500");
      } else {
        taskItem.classList.add("border-c-gray-400");
      }
      taskItem.classList.add(
        "px-4",
        "flex",
        "items-center",
        "justify-between",
        "gap-[18px]",
        "text-c-gray-100",
        "rounded-lg",
        "border",
        "shadow-[0px_2px_8px_0px_#0000000f]",
        "bg-c-gray-500"
      );
      taskItem.innerHTML = `
        <label for="${
          task.id
        }" class="flex items-center gap-[18px] py-4 cursor-pointer grow ${
        task.isChecked ? "line-through text-c-gray-300" : ""
      }">
        <input type="checkbox"
        class="task-checkbox min-w-[24px] min-h-[24px] appearance-none bg-transparent border-2 border-c-purple-dark rounded-full cursor-pointer relative checked:bg-c-purple-dark checked:border-c-purple-dark checked:after:content-['✓'] checked:after:text-c-gray-100 checked:after:text-[16px] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:translate-x-[-50%] checked:after:translate-y-[-50%] after:scale-0 checked:after:scale-100 after:transition-transform after:duration-100"
        id="${task.id}" ${task.isChecked ? "checked" : ""}>
        ${task.name}
        </label>
        <button type="button" aria-label="Delete task" id="delete-task-button" class="flex items-center justify-center p-1 border-none rounded-[4px] bg-transparent cursor-pointer transition-all duration-150 ease-in hover:bg-c-gray-400 group">
        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-current transition-all duration-150 ease-in group-hover:text-c-danger" d="M8.20214 4.98548H6.87158V10.5073H8.20214V4.98548Z" fill="#808080"/>
        <path class="fill-current transition-all duration-150 ease-in group-hover:text-c-danger" d="M5.46239 4.98548H4.13184V10.5073H5.46239V4.98548Z" fill="#808080"/>
        <path class="fill-current transition-all duration-150 ease-in group-hover:text-c-danger" d="M12.478 2.16712C12.4754 2.03061 12.4295 1.89846 12.3469 1.78975C12.2642 1.68104 12.1492 1.6014 12.0184 1.56232C11.9596 1.53782 11.8974 1.52252 11.8339 1.51696H8.28678C8.1525 1.07791 7.88082 0.693554 7.51174 0.420471C7.14265 0.147388 6.69564 0 6.23651 0C5.77738 0 5.33038 0.147388 4.96129 0.420471C4.5922 0.693554 4.32053 1.07791 4.18625 1.51696H0.639107C0.580679 1.51814 0.522686 1.52729 0.46674 1.54418H0.45162C0.313182 1.58701 0.193338 1.67547 0.11163 1.79515C0.0299214 1.91483 -0.00883041 2.05866 0.00169348 2.20319C0.0122174 2.34771 0.071396 2.48441 0.169579 2.59099C0.267763 2.69757 0.399158 2.76774 0.542339 2.79006L1.25298 12.5334C1.26382 12.9127 1.41693 13.2741 1.68191 13.5458C1.94688 13.8175 2.30435 13.9797 2.68332 14H9.78668C10.1662 13.9804 10.5244 13.8186 10.79 13.5468C11.0556 13.2751 11.2092 12.9132 11.22 12.5334L11.9277 2.79914C12.0802 2.77797 12.22 2.70232 12.3212 2.58615C12.4223 2.46999 12.478 2.32116 12.478 2.16712ZM6.23651 1.21456C6.3661 1.21458 6.49427 1.24146 6.61294 1.29351C6.73161 1.34556 6.8382 1.42164 6.92598 1.51696H5.54704C5.63459 1.42135 5.74114 1.34507 5.85986 1.29299C5.97859 1.24092 6.10687 1.21421 6.23651 1.21456ZM9.78668 12.7904H2.68332C2.60168 12.7904 2.47467 12.6573 2.45955 12.4457L1.75798 2.81123H10.715L10.0135 12.4457C9.99836 12.6573 9.87135 12.7904 9.78668 12.7904Z" fill="#808080"/>
        </svg>
        </button>
      `;
      const taskCheckbox = taskItem.querySelector(".task-checkbox");
      let deleteTaskButton = taskItem.querySelector("#delete-task-button");
      taskCheckbox.addEventListener("change", () =>
        toggleTaskCompletion(task.id)
      );
      deleteTaskButton.addEventListener("click", () => deleteTask(task.id));
      tasksList.prepend(taskItem);
    });
  } else {
    tasksList.innerHTML = `
      <li class="text-center py-16">
        <img src="./images/clipboard.png" alt="Empty list icon" class="w-14 h-14 mb-4 mx-auto">
        <h4>
          <span class="block text-c-gray-300 font-bold">You don't have any tasks yet.</span>
          <span class="block text-c-gray-300 font-normal">Create tasks and organize your to-do items.</span>
        </h4>
      </li>
    `;
  }
};
renderTasks();

// EVENT LISTENERS:
addNewTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskName = newTaskName.value.trim();
  const existingTask = duplicateTask(taskName);
  if (!taskName) {
    alert("Task name is required!");
    newTaskName.focus();
  } else if (existingTask) {
    alert(`Task with the name "${existingTask.name}" already exists!`);
    newTaskName.focus();
  } else {
    TASKS_ARRAY.push({
      id: Date.now(),
      name: taskName,
      isChecked: false,
    });
    saveDataToLocalStorage();
    updateTasksCount();
    updateCompletedTasksCount()
    renderTasks();
    console.log(TASKS_ARRAY);
    newTaskName.value = "";
  }
});
