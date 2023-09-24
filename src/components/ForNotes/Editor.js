import ReactMarkdown from "react-markdown";
import React from "react";

function Editor(props) {
  if (!props.currentNote)
    return <div className="no-active-note">No Active Note</div>;

  console.log(props.currentNote.body);
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={props.currentNote.body}
          onChange={(e) => {
            props.updateNote(e.target.value);
          }}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{props.currentNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {props.currentNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// import React from "react";
// import ReactMde from "react-mde";
// import ReactMarkdown from "react-markdown";
// import Showdown from "showdown";
// // import "react-mde/lib/styles/css/react-mde-all.css";

// function loadSuggestions(text) {
//   return new Promise((accept, reject) => {
//     setTimeout(() => {
//       const suggestions = [
//         {
//           preview: "Andre",
//           value: "@andre",
//         },
//         {
//           preview: "Angela",
//           value: "@angela",
//         },
//         {
//           preview: "David",
//           value: "@david",
//         },
//         {
//           preview: "Louise",
//           value: "@louise",
//         },
//       ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
//       accept(suggestions);
//     }, 250);
//   });
// }

// function Editor(props) {
//   const [selectedTab, setSelectedTab] = React.useState("write");

//   const save = async function*(data) {
//     // Promise that waits for "time" milliseconds
//     const wait = function(time) {
//       return new Promise((a, r) => {
//         setTimeout(() => a(), time);
//       });
//     };

//     // Upload "data" to your server
//     // Use XMLHttpRequest.send to send a FormData object containing
//     // "data"
//     // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

//     await wait(2000);
//     // yields the URL that should be inserted in the markdown
//     yield "https://picsum.photos/300";
//     await wait(2000);

//     // returns true meaning that the save was successful
//     return true;
//   };

//   const converter = new Showdown.Converter({
//     tables: true,
//     simplifiedAutoLink: true,
//     strikethrough: true,
//     tasklists: true,
//   });

//   return (
//     <section className="pane editor">
//       <ReactMde
//         value={props.currentNote.body}
//         onChange={props.updateNote}
//         selectedTab={selectedTab}
//         onTabChange={setSelectedTab}
//         generateMarkdownPreview={(markdown) =>
//           Promise.resolve(<ReactMarkdown source={markdown} />)
//         }
//         loadSuggestions={loadSuggestions}
//         childProps={{
//           writeButton: {
//             tabIndex: -1,
//           },
//         }}
//         paste={{
//           saveImage: save,
//         }}
//       />
//     </section>
//   );
// }

// const onEditField = (field, value) => {
//   onUpdateNote({
//     ...activeNote,
//     [field]: value,
//     lastModified: Date.now(),
//   });
// };

// if (!activeNote) return <div className="no-active-note">No Active Note</div>;

// return (
//   <div className="app-main">
//     <div className="app-main-note-edit">
//       <input
//         type="text"
//         id="title"
//         placeholder="Note Title"
//         value={activeNote.title}
//         onChange={(e) => onEditField("title", e.target.value)}
//         autoFocus
//       />
//       <textarea
//         id="body"
//         placeholder="Write your note here..."
//         value={activeNote.body}
//         onChange={(e) => onEditField("body", e.target.value)}
//       />
//     </div>
//     <div className="app-main-note-preview">
//       <h1 className="preview-title">{activeNote.title}</h1>
//       <ReactMarkdown className="markdown-preview">
//         {activeNote.body}
//       </ReactMarkdown>
//     </div>
//   </div>

export default Editor;
