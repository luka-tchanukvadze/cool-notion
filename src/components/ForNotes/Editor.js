import ReactMarkdown from "react-markdown";
import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Editor(props) {
  if (!props.currentNote)
    return <div className="no-active-note">No Active Note</div>;

  const [editing, setEditing] = useState(false);
  const textareaRef = useRef(null);
  const [newTextarea, setNewTextarea] = useState(""); // Track the content of the new textarea

  const textAreas = props.currentNote.textAreas;
  const setTextAreas = props.updateTextarea;

  const addTextarea = () => {
    const setTextAreas = (prev) => [
      ...prev,
      <textarea value={props.currentNote.textAreas} key={prev.length} />,
    ];
  };
  // const handleTextareaChange = (e) => {
  //   setTextareaValue(e.target.value);
  // };

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

  const handleKeyPress = (e, index) => {
    if (e.key === "Backspace") {
      setTextAreas(textAreas.filter((label, i) => i !== index));
    }
    if (e.key === "Enter") {
      // Create a new textarea with the content of the newTextarea state
      setTextAreas([...textAreas, newTextarea]);

      // Clear the newTextarea state to start with an empty textarea next time
      setNewTextarea("");

      e.preventDefault(); // Prevent the default Enter key behavior (newline)
    }
  };
  const handleTextareaChange = (e, index) => {
    setTextAreas(
      textAreas.map((txt, i) => (i === index ? e.target.value : txt))
    );
  };

  const lastTextarea = useCallback((textarea) => {
    if (textarea) textarea.focus();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="app-main" style={{ minHeight: "40rem" }}>
              <div className="app-main-note-edit">
                {editing ? (
                  <div ref={textareaRef} onClick={handleOutsideClick}>
                    <textarea
                      rows={1}
                      style={{ width: "400px", height: "100px" }}
                      placeholder="Write your note here..."
                      value={props.currentNote.body}
                      onChange={(e) => {
                        props.updateNote(e.target.value);
                      }}
                      onKeyDown={handleKeyPress}
                    />
                    {textAreas.map((label, index) => (
                      <div key={index}>
                        <textarea
                          onKeyDown={(e) =>
                            handleKeyPress(e, label === "" ? index : undefined)
                          }
                          ref={lastTextarea}
                          onChange={(e) => handleTextareaChange(e, index)}
                          value={label}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  // <div onClick={toggleEditMode}>{props.currentNote.body}</div>
                  <>
                    <div
                      onClick={toggleEditMode}
                      className="app-main-note-preview"
                      style={{ whiteSpace: "pre-line", color: "darkslategray" }}
                    >
                      <h1 className="preview-title">
                        {props.currentNote.title}
                      </h1>
                      <ReactMarkdown className="markdown-preview">
                        {`${props.currentNote.body}\n${textAreas.join("\n")}`}
                      </ReactMarkdown>
                    </div>
                    {/* <div>
              <textarea placeholder="outside text area" />
            </div> */}
                  </>
                )}
              </div>
              {/* <div className="app-main-note-preview">
        <h1 className="preview-title">{props.currentNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {props.currentNote.body}
        </ReactMarkdown>
      </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

// export default Editor;

// import ReactMarkdown from "react-markdown";
// import React, { useState, useRef, useCallback, useEffect } from "react";

// function Editor(props) {
//   if (!props.currentNote)
//     return <div className="no-active-note">No Active Note</div>;

//   const [editing, setEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(props.currentNote.body);
//   const textareaRef = useRef(null);
//   const [newTextarea, setNewTextarea] = useState(""); // Track the content of the new textarea

//   const textAreas = props.currentNote.textAreas;
//   const setTextAreas = props.updateTextarea;

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
//     <div className="app-main">
//       <div className="app-main-note-edit">
//         {editing ? (
//           <div ref={textareaRef} onClick={handleOutsideClick}>
//             <textarea
//               rows={1}
//               style={{ width: "400px", height: "100px" }}
//               placeholder="Write your note here..."
//               value={props.currentNote.body}
//               onChange={(e) => {
//                 props.updateNote(e.target.value);
//               }}
//               onKeyDown={handleKeyPress}
//             />
//             {textAreas.map((label, index) => (
//               <div key={index}>
//                 <textarea
//                   onKeyDown={(e) =>
//                     handleKeyPress(e, label === "" ? index : undefined)
//                   }
//                   ref={lastTextarea}
//                   onChange={(e) => handleTextareaChange(e, index)}
//                   value={label}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           // <div onClick={toggleEditMode}>{props.currentNote.body}</div>
//           <>
//             <div
//               onClick={toggleEditMode}
//               className="app-main-note-preview"
//               style={{ whiteSpace: "pre-line" }}
//             >
//               <h1 className="preview-title">{props.currentNote.title}</h1>
//               <ReactMarkdown className="markdown-preview">
//                 {`luka`}
//                 {/* {`${props.currentNote.body}\n${textAreas.join("\n")}`} */}
//               </ReactMarkdown>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

export default Editor;
