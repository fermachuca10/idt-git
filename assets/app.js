(() => {
  "use strict";

  const KEY = "idt-clase17-tareas-v1";
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list = document.querySelector("#task-list");
  const empty = document.querySelector("#empty-state");
  const feedback = document.querySelector("#feedback");
  const filters = Array.from(document.querySelectorAll("[data-filter]"));
  const total = document.querySelector("#total-count");
  const pending = document.querySelector("#pending-count");
  const completed = document.querySelector("#completed-count");
  const clearButton = document.querySelector("#clear-completed");

  const examples = [
    { id: "ejemplo-1", text: "Practicar git add y git commit", done: true },
    { id: "ejemplo-2", text: "Crear una rama feature", done: false },
    { id: "ejemplo-3", text: "Revisar un Pull Request", done: false }
  ];
  let storageAvailable = true;
  let tasks = load();
  let filter = "all";

  function load() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === null) return examples.map(task => ({ ...task }));
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(item =>
        item && typeof item.id === "string" && typeof item.text === "string" &&
        typeof item.done === "boolean"
      ).map(item => ({ id: item.id, text: item.text.slice(0, 120), done: item.done }));
    } catch {
      storageAvailable = false;
      return examples.map(task => ({ ...task }));
    }
  }

  function save() {
    if (!storageAvailable) return;
    try { localStorage.setItem(KEY, JSON.stringify(tasks)); }
    catch { storageAvailable = false; feedback.textContent = "No se pudo guardar en el navegador. Los cambios duran esta sesión."; }
  }

  function generateId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return "task-" + Date.now() + "-" + Math.random().toString(36).slice(2);
  }

  function render() {
    const finished = tasks.filter(task => task.done).length;
    total.textContent = String(tasks.length);
    pending.textContent = String(tasks.length - finished);
    completed.textContent = String(finished);
    filters.forEach(button => {
      const selected = button.dataset.filter === filter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    list.replaceChildren();
    const shown = tasks.filter(task => filter === "all" ||
      (filter === "completed" ? task.done : !task.done));

    shown.forEach(task => {
      const row = document.createElement("li");
      row.className = "task-item" + (task.done ? " is-done" : "");
      row.dataset.id = task.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-check";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", "Completar " + task.text);

      const label = document.createElement("span");
      label.className = "task-text";
      label.textContent = task.text;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete";
      remove.textContent = "Eliminar";
      remove.setAttribute("aria-label", "Eliminar " + task.text);

      row.append(checkbox, label, remove);
      list.append(row);
    });
    empty.hidden = shown.length !== 0;
    clearButton.disabled = finished === 0;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (text.length < 3 || text.length > 120) {
      feedback.textContent = "La tarea debe tener entre 3 y 120 caracteres.";
      return;
    }
    feedback.textContent = "";
    tasks.unshift({ id: generateId(), text, done: false });
    save();
    input.value = "";
    input.focus();
    render();
  });

  list.addEventListener("change", event => {
    if (!event.target.matches(".task-check")) return;
    const row = event.target.closest("[data-id]");
    const task = tasks.find(item => item.id === row?.dataset.id);
    if (!task) return;
    task.done = event.target.checked;
    save();
    render();
  });

  list.addEventListener("click", event => {
    if (!event.target.matches(".delete")) return;
    const row = event.target.closest("[data-id]");
    tasks = tasks.filter(item => item.id !== row?.dataset.id);
    save();
    render();
  });

  filters.forEach(button => button.addEventListener("click", () => {
    filter = button.dataset.filter;
    render();
  }));

  clearButton.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.done);
    save();
    render();
  });

  render();
})();