import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateNotes(props) {
  return (
    <Link to="/">
      <div className="no-notes">
        <h1 style={{ color: "#0D6EFD" }}>You have no notes</h1>
        <Button
          onClick={props.createNewNote}
          className="btn btn-outline-secondary"
          style={{ fontSize: "1.1rem" }}
        >
          Create one now
        </Button>
      </div>
    </Link>
  );
}

export default CreateNotes;
