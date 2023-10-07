import ReactMarkdown from "react-markdown";
import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

function Editor(props) {
  if (!props.currentNote)
    return <div className="no-active-note">No Active Note</div>;

  const [activeTextarea, setActiveTextarea] = useState(-1);

  const textareas = props.currentNote.textAreas;
  const setTextareas = props.updateTextarea;

  const ref = useCallback((e) => {
    if (e) {
      const length = e.value.length;
      e.focus();
      e.setSelectionRange(length, length);
    }
  }, []);

  const handleKeyDown = (e) => {
    const { key } = e;
    if (key === "Enter") {
      let { selectionStart } = e.target;
      if (!selectionStart) selectionStart = 0;

      const newTexts = [...textareas];
      const cutOffText = newTexts[activeTextarea].slice(selectionStart);
      newTexts[activeTextarea] = newTexts[activeTextarea].slice(
        0,
        selectionStart
      );
      newTexts.splice(activeTextarea + 1, 0, cutOffText);
      setTextareas(newTexts);
      setActiveTextarea((i) => ++i);
      e.preventDefault();
    } else if (key === "Backspace") {
      const activeText = textareas[activeTextarea];
      if (activeText === "" && activeTextarea > 0) {
        setTextareas(textareas.filter((_, index) => index !== activeTextarea));
        setActiveTextarea((i) => --i);
        e.preventDefault();
      }
    }
  };

  const handleArrowKeys = (e) => {
    const { key } = e;
    if (key === "ArrowUp" && activeTextarea > 0) {
      setActiveTextarea((i) => i - 1);
    } else if (key === "ArrowDown" && activeTextarea < textareas.length - 1) {
      setActiveTextarea((i) => i + 1);
    }
  };

  useEffect(() => {
    // Add event listeners for arrow keys when the component mounts
    window.addEventListener("keydown", handleArrowKeys);
    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener("keydown", handleArrowKeys);
    };
  }, [activeTextarea]);

  return (
    <>
      <div className="editor-text d-flex p-2 flex-column fluid">
        <div className="app-main" style={{ minHeight: "120vh" }}>
          <div className="app-main-note-edit">
            <div
              className="app-main-note-preview d-flex flex-column mb-3"
              style={{
                whiteSpace: "pre-line",
                color: "darkslategray",
                wordWrap: "break-word",
              }}
            >
              <h1
                style={{ fontSize: "2rem", backgroundColor: "blue" }}
                className="preview-title"
              >
                {props.currentNote.title}
              </h1>
              <div style={{ display: "grid", gridAutoRows: "1fr" }}>
                {textareas.map((label, i) => {
                  const isDiv = activeTextarea !== i;
                  return isDiv ? (
                    <div
                      style={{ minHeight: "1rem", marginBottom: ".8rem" }}
                      key={i}
                      onClick={() => setActiveTextarea(i)}
                    >
                      <ReactMarkdown className="markdown-preview">
                        {label}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div key={i}>
                      <TextareaAutosize
                        style={{
                          backgroundColor: "transparent",
                          color: "darkslategray",
                          width: "100%",
                          fontSize: "1.3rem",
                          border: "none",
                          resize: "none",
                        }}
                        ref={ref}
                        value={label}
                        onKeyDown={handleKeyDown}
                        onBlur={() =>
                          setActiveTextarea((index) =>
                            i === index ? -1 : index
                          )
                        }
                        onChange={(e) => {
                          // es function zemot aitane tu ginda
                          // if (i === 0) {
                          props.updateNote(e.target.value);
                          // }
                          setTextareas(
                            textareas.map((v, index) =>
                              i === index ? e.target.value : v
                            )
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editor;
