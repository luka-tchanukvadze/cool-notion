import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar(props) {
  const route = window.location.href.toString().split(window.location.host)[1];
  console.log(route);
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <Link className="link-to-editor" to="/">
        <div
          className={`title ${
            note.id === props.currentNote.id ? "selected-note" : ""
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <Stack
            gap={3}
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              color: "#0D6EFD",
            }}
          >
            <div className="p-2 text-snippet">
              {note.body.split("\n")[0] || "Untitled"}
            </div>
          </Stack>

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
          <h3
            style={{
              marginBottom: "0",
              color: "#0D6EFD",
              fontSize: "2.1rem",
              fontWeight: "530",
            }}
          >
            Notes
          </h3>

          <svg
            style={{ cursor: "pointer" }}
            onClick={props.newNote}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#0D6EFD"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </div>
        <div className="for-todo">{noteElements}</div>
        <Link to="/futurePlans" className="future-plans">
          <div className="future-plans-div">
            <Button
              type="button"
              class="btn btn-xs btn-outline-secondary"
              style={{ fontSize: "1.1rem" }}
            >
              Future Plans
            </Button>
          </div>
        </Link>
      </section>
    </>
  );
}

export default Sidebar;
