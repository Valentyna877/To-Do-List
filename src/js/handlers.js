import { nanoid } from "nanoid";
import localStorageApi from "./local-storage-api";
import { renderTasks } from "./render-tasks";

function wrapInputsWithFormGroup() {
  document.querySelectorAll("#task-form .header-form-input").forEach((input) => {
    if (!input.parentElement.classList.contains("form-group")) {
      const wrapper = document.createElement("div");
      wrapper.className = "form-group";
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);
    }
  });
}

function showError(input, message) {
  const wrapper = input.parentElement; 
  let errorEl = wrapper.querySelector(".error-message");

  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.className = "error-message";
    wrapper.appendChild(errorEl);
  }

  errorEl.innerHTML = `<span class="error-icon">⚠️</span> ${message}`;
  input.classList.add("input-error");
}

function clearError(input) {
  const wrapper = input.parentElement;
  const errorEl = wrapper.querySelector(".error-message");
  if (errorEl) {
    errorEl.textContent = "";
  }
  input.classList.remove("input-error");
}

function validateInputs(taskName, taskDescription) {
  let isValid = true;

  if (!taskName.value.trim()) {
    showError(taskName, "Поле 'Назва' обов'язкове");
    isValid = false;
  } else {
    clearError(taskName);
  }

  if (!taskDescription.value.trim()) {
    showError(taskDescription, "Поле 'Опис' обов'язкове");
    isValid = false;
  } else {
    clearError(taskDescription);
  }

  return isValid;
}

export function onFormSubmit(e) {
  e.preventDefault();

  const { taskName, taskDescription } = e.target.elements;
  const name = taskName.value.trim();
  const description = taskDescription.value.trim();

  if (!validateInputs(taskName, taskDescription)) {
    return;
  }

  const task = {
    name,
    description,
    id: nanoid(),
  };

  localStorageApi.saveTasks(task);
  const tasks = localStorageApi.getTasks();

  renderTasks(tasks);

  e.target.reset();
}

export function attachValidationListeners() {
  const form = document.querySelector("#task-form");
  const { taskName, taskDescription } = form.elements;

  [taskName, taskDescription].forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim()) {
        clearError(input);
      }
    });
  });
}

export function onTaskDelete(e) {
  if (!e.target.classList.contains("task-list-item-btn")) {
    return;
  }

  const taskId = e.target.dataset.id;
  localStorageApi.deleteTask(taskId);
  const tasks = localStorageApi.getTasks();
  renderTasks(tasks);
}

wrapInputsWithFormGroup();