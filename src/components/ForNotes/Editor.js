import ReactMarkdown from "react-markdown";
import React from "react";
import { useState, useRef, useEffect } from "react";

function Editor(props) {
  if (!props.currentNote)
    return <div className="no-active-note">No Active Note</div>;

  const [editing, setEditing] = useState(false);
  const textareaRef = useRef(null);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTextarea();
    }
  };

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        {editing ? (
          <div ref={textareaRef} onClick={handleOutsideClick}>
            <textarea
              style={{ width: "400px", height: "100px" }}
              // ref={textareaRef} // Assign the ref to the textarea element
              placeholder="Write your note here..."
              value={props.currentNote.body}
              onChange={(e) => {
                props.updateNote(e.target.value);
              }}
              // onClick={handleOutsideClick}
              onKeyDown={handleKeyPress}
            />
            <div></div>
          </div>
        ) : (
          // <div onClick={toggleEditMode}>{props.currentNote.body}</div>
          <>
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
  );
}

// export default Editor;
// import ReactMarkdown from "react-markdown";
// import React, { useState, useRef, useEffect } from "react";

// function Editor(props) {
//   if (!props.currentNote)
//     return <div className="no-active-note">No Active Note</div>;

//   const [editing, setEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(props.currentNote.body);
//   const textareaRef = useRef(null);
//   const [textAreas, setTextAreas] = useState([]);
//   const [newTextarea, setNewTextarea] = useState(""); // Track the content of the new textarea

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

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       // Create a new textarea with the content of the newTextarea state
//       setTextAreas([
//         ...textAreas,
//         <textarea key={textAreas.length} value={newTextarea} />,
//       ]);

//       // Clear the newTextarea state to start with an empty textarea next time
//       setNewTextarea("");

//       e.preventDefault(); // Prevent the default Enter key behavior (newline)
//     }
//   };

//   const handleNewTextareaChange = (e) => {
//     // Update the content of the new textarea
//     setNewTextarea(e.target.value);
//   };

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
//             {textAreas.map((textarea, index) => (
//               <div key={index}>{textarea}</div>
//             ))}
//             {/* The new textarea */}
//             <textarea
//               placeholder="New Textarea"
//               value={newTextarea}
//               onChange={handleNewTextareaChange}
//               onKeyDown={handleKeyPress}
//             />
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
//                 {props.currentNote.body}
//               </ReactMarkdown>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

export default Editor;
