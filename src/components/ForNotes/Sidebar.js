import React from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <Link className="link-to-editor" to="/">
        <div
          className={`title ${
            note.id === props.currentNote.id ? "selected-note" : ""
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>

          <button
            className="delete-btn"
            onClick={(event) => props.deleteNote(event, note.id)}
          >
            <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      <section className="pane sidebar">
        <div className="sidebar--header">
          <h3>Notes</h3>
          <button className="new-note" onClick={props.newNote}>
            +
          </button>
        </div>
        <div className="for-todo">{noteElements}</div>
        <Link to="/futurePlans" className="future-plans">
          <div className="future-plans-div">Future Plans</div>
        </Link>
      </section>
    </>
  );
}

export default Sidebar;
