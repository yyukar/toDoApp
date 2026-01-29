# TodoMVC Clone — React (Vite)

A **beginner-friendly TodoMVC-style** app built with **React + Vite**.

This project keeps the classic **TodoMVC HTML/CSS class names** (so the UI looks familiar) while implementing the behavior using **plain React state** — **no Context, no localStorage** (reload resets data).

---

## Live Demo

- [Vercel live demo](https://to-do-app-gray-alpha.vercel.app)

---

## Features

### Todos
- Add a todo (Enter/submit)
- Toggle a todo (done/undone)
- Delete a todo (× button)
- Toggle all (mark all complete / uncomplete)
- Clear completed

### Filtering
- All
- Active
- Completed

### UI
- Uses the classic TodoMVC layout + classes
- CSS split into:
  - `index.css` (global reset + variables)
  - `App.css` (todo UI styles)

---

## Getting Started

### Requirements
- Node.js (LTS recommended)
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build

```bash
npm run build
npm run preview
```

---

## Tech Stack
- React (Vite)
- JavaScript (Hooks)
- CSS (global + app styles)

---

## Project Structure

```text
todoapp-react/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

> Your folder names may differ slightly. The key idea is **global styles in `index.css`** and **todo UI styles in `App.css`**.

---

## How It Works (React Mental Model)

### 1) State (the “source of truth”)
In `App.jsx` we keep everything in state:

- `todos`: array of todo objects  
  Example: `{ id, text, done }`
- `newText`: what the user is typing
- `filter`: `"all" | "active" | "completed"`

React renders the UI **based on state**.  
When state changes → React re-renders → UI updates automatically.

### 2) Derived values (calculated, not stored)
We don’t store values like “items left” as state, because it can be **calculated** from `todos`:

- `leftCount` = number of todos where `done === false`
- `doneCount` = total - leftCount
- `allDone` = if all items are completed
- `visibleTodos` = filtered list based on `filter`

These are computed with `useMemo()` to keep the code clean and avoid re-calculating on every render.  
(For small apps, it would still work without `useMemo` — it’s optional.)

### 3) Actions (state updates)
Each UI interaction calls a small function that updates state:

- `addTodo()`: add item to the end of `todos`
- `toggleTodo(id)`: flip `done` for that item
- `removeTodo(id)`: remove item from list
- `toggleAll(done)`: set all items’ `done`
- `clearCompleted()`: remove all done items
- Filter links set `filter`

Because state is immutable, we create **new arrays** with `map()` and `filter()`.

---

## Starter Data

The app starts with a simple array:

```js
[
  { id: 1, text: "Learn JavaScript", done: true },
  { id: 2, text: "Learn React", done: false },
  { id: 3, text: "Have a life!", done: false },
]
```

Reloading the page resets to this initial data because we **do not use localStorage** in this version.

---

## CSS Notes

- The JSX uses TodoMVC class names (`todoapp`, `new-todo`, `todo-list`, `completed`, etc.)
- That means you can:
  - keep classic TodoMVC CSS, or
  - replace it with your own theme without changing React code

Recommended approach:
- `index.css` → global reset + variables
- `App.css` → only the Todo UI

---

## Thanks

This project was created with the support of **Patika.dev Fullstack Java Developer Bootcamp**.  
Special thanks to the instructors and community contributors.

---

## License

This project is currently **unlicensed**.  
You are free to use, modify, and learn from the code.
