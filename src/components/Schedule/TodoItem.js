import React from "react";
import { Button } from "react-bootstrap";
// import Form from "react-bootstrap/Form";

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
      <Button
        onClick={() => delteTodo(id)}
        style={{ fontSize: "0.8rem" }}
        variant="danger"
        size="sm"
      >
        Delete
      </Button>
      {/* <button onClick={() => delteTodo(id)} className="btn btn-danger">
        Delete
      </button> */}
    </li>
  );
}

export default TodoItem;
