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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

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
          onKeyDown={handleKeyPress}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder="Plan Title"
        />
      </div>
      <Button onClick={handleSubmit} type="button" className="btn btn-xs ">
        Add
      </Button>
    </form>
  );
}

export default NewTodoForm;
