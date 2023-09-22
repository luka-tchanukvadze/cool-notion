import React from "react";

function TodoItem({ completed, id, title, toggleTodo, delteTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => delteTodo(id)} className="btn btn-danger">
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
