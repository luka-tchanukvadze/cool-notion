// import ReactMarkdown from "react-markdown";
// import React from "react";
// import { useState, useRef, useCallback, useEffect } from "react";
// import TextareaAutosize from "react-textarea-autosize";

// function Editor(props) {
//   if (!props.currentNote)
//     return <div className="no-active-note">No Active Note</div>;

//   const [editing, setEditing] = useState(false);
//   const textareaRef = useRef(null);
//   const [newTextarea, setNewTextarea] = useState(""); // Track the content of the new textarea
//   const [activeTextArea, setActiveTextArea] = useState(0);

//   const textAreas = props.currentNote.textAreas;
//   const setTextAreas = props.updateTextarea;

//   const addTextarea = () => {
//     const setTextAreas = (prev) => [
//       ...prev,
//       <textarea value={props.currentNote.textAreas} key={prev.length} />,
//     ];
//   };
//   // const handleTextareaChange = (e) => {
//   //   setTextareaValue(e.target.value);
//   // };

//   useEffect(() => {
//     if (editing) {
//       document.addEventListener("click", handleOutsideClick);
//     } else {
//       document.removeEventListener("click", handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   }, [editing]);

//   const handleOutsideClick = (e) => {
//     if (textareaRef.current && !textareaRef.current.contains(e.target)) {
//       // props.updateNote(editedContent);
//       setEditing(false);
//     }
//   };

//   const toggleEditMode = () => {
//     setEditing(!editing);
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.key === "Backspace") {
//       setTextAreas(textAreas.filter((label, i) => i !== index));
//     }
//     if (e.key === "Enter") {
//       // Create a new textarea with the content of the newTextarea state
//       setTextAreas([...textAreas, newTextarea]);

//       // Clear the newTextarea state to start with an empty textarea next time
//       setNewTextarea("");

//       e.preventDefault(); // Prevent the default Enter key behavior (newline)
//     }
//   };
//   const handleTextareaChange = (e, index) => {
//     setTextAreas(
//       textAreas.map((txt, i) => (i === index ? e.target.value : txt))
//     );
//   };

//   const lastTextarea = useCallback((textarea) => {
//     if (textarea) textarea.focus();
//   }, []);

//   return (
//     <>
//       <div className="editor-text d-flex p-2 flex-column fluid">
//         <div className="app-main" style={{ minHeight: "120vh" }}>
//           <div className="app-main-note-edit">
//             {editing ? (
//               <div ref={textareaRef} onClick={handleOutsideClick}>
//                 <TextareaAutosize
//                   className="editor-css"
//                   style={{
//                     backgroundColor: "transparent",
//                     color: "darkslategray",
//                     width: "100%",
//                     fontSize: "1.3rem",
//                     // outline: "none",
//                     border: "none",
//                     resize: "none",
//                   }}
//                   placeholder="Write your note here..."
//                   value={props.currentNote.body}
//                   onChange={(e) => {
//                     props.updateNote(e.target.value);
//                   }}
//                   onKeyDown={handleKeyPress}
//                 />
//                 {textAreas.map((label, index) => (
//                   <div key={index}>
//                     <TextareaAutosize
//                       className="editor-css"
//                       onKeyDown={(e) => {
//                         setActiveTextArea(index);
//                         return handleKeyPress(
//                           e,
//                           label === "" ? index : undefined
//                         );
//                       }}
//                       // rows={1}
//                       style={{
//                         backgroundColor: "transparent",
//                         color: "darkslategray",
//                         width: "100%",
//                         fontSize: "1.3rem",
//                         // outline: "none",
//                         border: "none",
//                         resize: "none",
//                       }}
//                       // onFocus={() => setActiveTextArea(index)}
//                       ref={lastTextarea}
//                       onChange={(e) => handleTextareaChange(e, index)}
//                       value={label}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               // <div onClick={toggleEditMode}>{props.currentNote.body}</div>
//               <>
//                 <div
//                   onClick={toggleEditMode}
//                   className="app-main-note-preview d-flex flex-column mb-3"
//                   style={{
//                     whiteSpace: "pre-line",
//                     color: "darkslategray",
//                     wordWrap: "break-word",
//                   }}
//                 >
//                   <h1
//                     // style={{ fontSize: "2rem", backgroundColor: "blue" }}
//                     className="preview-title"
//                   >
//                     {props.currentNote.title}
//                   </h1>
//                   <ReactMarkdown className="markdown-preview">
//                     {props.currentNote.body}
//                   </ReactMarkdown>
//                   {textAreas.map((label, index) => (
//                     <ReactMarkdown key={index} className="markdown-preview">
//                       {label}
//                     </ReactMarkdown>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Editor;

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
              {textareas.map((label, i) => {
                const isDiv = activeTextarea !== i;
                return isDiv ? (
                  <div key={i} onClick={() => setActiveTextarea(i)}>
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
                        setActiveTextarea((index) => (i === index ? -1 : index))
                      }
                      onChange={(e) => {
                        // es function zemot aitane tu ginda
                        if (i === 0) {
                          props.updateNote(e.target.value);
                        }
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
    </>
  );
}

export default Editor;
