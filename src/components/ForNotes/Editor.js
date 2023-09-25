import ReactMarkdown from "react-markdown";
import React from "react";
import { useState, useRef, useEffect } from "react";

function Editor(props) {
  if (!props.currentNote)
    return <div className="no-active-note">No Active Note</div>;

  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(props.currentNote.body);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editing) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [editing]);

  const handleOutsideClick = (e) => {
    if (textareaRef.current && !textareaRef.current.contains(e.target)) {
      // props.updateNote(editedContent);
      setEditing(false);
    }
  };

  const toggleEditMode = () => {
    setEditing(!editing);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSave = () => {
    // Save the edited content and exit editing mode
    props.updateNote(editedContent);
    setEditing(false);
  };

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {editing ? (
          <textarea
            style={{ width: "300px", height: "100px" }}
            ref={textareaRef} // Assign the ref to the textarea element
            placeholder="Write your note here..."
            value={props.currentNote.body}
            onChange={(e) => {
              props.updateNote(e.target.value);
            }}
            onClick={handleOutsideClick}
          />
        ) : (
          // <div onClick={toggleEditMode}>{props.currentNote.body}</div>
          <div
            onClick={toggleEditMode}
            className="app-main-note-preview"
            style={{ whiteSpace: "pre-line" }}
          >
            <h1 className="preview-title">{props.currentNote.title}</h1>
            <ReactMarkdown className="markdown-preview">
              {props.currentNote.body}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {/* <div className="app-main-note-preview">
        <h1 className="preview-title">{props.currentNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {props.currentNote.body}
        </ReactMarkdown>
      </div> */}
    </div>
  );
}

export default Editor;
