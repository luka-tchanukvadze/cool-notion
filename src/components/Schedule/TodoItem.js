import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoItem({ completed, id, title, toggleTodo, delteTodo }) {
  return (
    <li>
      <label style={{ color: "#0D6EFD" }}>
        <input
          style={{ color: "darkslategray" }}
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <Button className="delete" onClick={() => delteTodo(id)} variant="danger">
        Delete
      </Button>
    </li>
  );
}

export default TodoItem;
