import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;

    onSubmit(newItem);

    setNewItem("");
  }

  return (
    <form className="new-item-form">
      <div className="form-row">
        <label
          style={{ fontWeight: "700", color: "darkslategray" }}
          htmlFor="item"
        >
          New Item
        </label>
        <Form.Control
          style={{
            color: "#00AAFF",
            backgroundColor: "#00aaff1a",
            borderColor: "#00AAFF",
          }}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder="Plan Title"
        />
      </div>
      {/* <button className="btn">Add</button> */}
      <Button
        onClick={handleSubmit}
        type="button"
        class="btn btn-xs btn-outline-secondary"
      >
        Add
      </Button>
    </form>
  );
}

export default NewTodoForm;
