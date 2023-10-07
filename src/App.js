import * as React from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import Editor from "./components/ForNotes/Editor";
import Sidebar from "./components/ForNotes/Sidebar";
import CreateNotes from "./components/CreateNotes";
import Header from "./components/Header";
import { v4 as uuidv4 } from "uuid";
import Split from "react-split";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FuturePlans from "./components/Schedule/FuturePlans";
// import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import reactTextareaAutosize from "react-textarea-autosize";

export default function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  console.log("n", notes);

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("dark")) || false
  );

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  function createNewNote() {
    const newNote = {
      id: uuidv4(),
      // body: "# Type your markdown note's title here",
      textAreas: ["Untitled"],
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  const updateTextarea = (textAreas) => {
    setNotes((oldNotes) =>
      oldNotes.map(
        (note) => (note.id === currentNoteId ? { ...note, textAreas } : note)
        // note.id === currentNoteId && { ...note, textAreas }
      )
    );
  };

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, textAreas: text });
          // newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <BrowserRouter>
      <main
        className={`${darkMode ? "dark" : ""}`}
        style={{
          backgroundColor: darkMode ? "#191D1D" : "",
          transition: "0.20s",
        }}
      >
        {notes.length > 0 ? (
          <Split sizes={[30, 70]} direction="horizontal" className="split">
            <div className="nav-container">
              <Sidebar
                notes={notes}
                currentNote={findCurrentNote()}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
                deleteNote={deleteNote}
              />
            </div>
            {
              <div className="header-container">
                <Header
                  currentNote={findCurrentNote()}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Editor
                        updateTextarea={updateTextarea}
                        currentNote={findCurrentNote()}
                        updateNote={updateNote}
                        rows={5}
                        minRows={5}
                        maxRows={10}
                      />
                    }
                  />
                  <Route path="/futurePlans" element={<FuturePlans />} />
                </Routes>
              </div>
            }
          </Split>
        ) : (
          <Split sizes={[50, 50]} direction="horizontal" className="split">
            <div style={{ marginTop: "7.5rem" }} className="nav-container-2">
              <FuturePlans />
            </div>

            <div className="editor-side">
              <div className="header-container-2">
                <Header
                  currentNote={findCurrentNote()}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </div>

              <CreateNotes createNewNote={createNewNote} />
            </div>
          </Split>
        )}
      </main>
    </BrowserRouter>
  );
}
