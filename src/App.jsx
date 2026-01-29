// Main Todo app component and UI
import './App.css'
import { useMemo, useState } from "react";

export default function App() {

  // UI state: active filter tab, input text, and todo list
  const [filter, setFilter] = useState("all");
  const [newText, setNewText] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn JavaScript", done: true },
    { id: 2, text: "Learn React", done: false },
    { id: 3, text: "Have a life!", done: false },
  ]);

  // Derived counts used by the footer and toggle-all checkbox
  const leftCount = useMemo(() => todos.filter(t => !t.done).length, [todos]);
  const doneCount = todos.length - leftCount;
  const allDone = todos.length > 0 && leftCount === 0;

  // Filter todos based on the selected tab
  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter(t => !t.done);
    if (filter === "completed") return todos.filter(t => t.done);
    return todos;
  }, [todos, filter]);

  // Create a new todo from the input field
  function addTodo() {
    const v = newText.trim();
    if (!v) return;
    setTodos(prev => [...prev, { id: Date.now(), text: v, done: false }]);
    setNewText("");
  }

  // Toggle a single todo done/undone
  function toggleTodo(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  // Remove a todo by id
  function removeTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  // Mark all todos as done or not done
  function toggleAll(nextDone) {
    setTodos(prev => prev.map(t => ({ ...t, done: nextDone })));
  }

  // Clear only completed todos
  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.done));
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          {/* Input form for creating a new todo */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
          >
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </form>
        </header>

        {/* Main list only shows when there are todos */}
        {todos.length > 0 && (
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              checked={allDone}
              onChange={(e) => toggleAll(e.target.checked)}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
              {visibleTodos.map((t) => (
                <li key={t.id} className={t.done ? "completed" : ""}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={t.done}
                      onChange={() => toggleTodo(t.id)}
                    />
                    <label>{t.text}</label>
                    <button className="destroy" onClick={() => removeTodo(t.id)} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer controls: counts, filters, and clear button */}
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              <strong>{leftCount}</strong> items left
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={filter === "all" ? "selected" : ""}
                  onClick={(e) => (e.preventDefault(), setFilter("all"))}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  className={filter === "active" ? "selected" : ""}
                  onClick={(e) => (e.preventDefault(), setFilter("active"))}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  className={filter === "completed" ? "selected" : ""}
                  onClick={(e) => (e.preventDefault(), setFilter("completed"))}
                >
                  Completed
                </a>
              </li>
            </ul>

            {doneCount > 0 && (
              <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </footer>
        )}
      </section>
    </>
  );
}
