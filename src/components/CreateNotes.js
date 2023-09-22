import React from "react";
import { Link } from "react-router-dom";

function CreateNotes(props) {
  return (
    <Link to="/">
      <div className="no-notes">
        <h1>You have no notes</h1>
        <button className="first-note" onClick={props.createNewNote}>
          Create one now
        </button>
      </div>
    </Link>
  );
}

export default CreateNotes;
