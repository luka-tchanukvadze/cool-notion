import React, { useState } from "react";
import HeaderMenu from "./menus/HeaderMenu";
// import { useState } from "react";
// import { ThreeBarsIcon } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactMarkdown from "react-markdown";

function Header(props) {
  const [menu, setMenu] = useState(false);

  function handleClick() {
    setMenu((prev) => !prev);
  }

  return (
    <header className="header">
      <div className="header-text">
        <ReactMarkdown>
          {props.currentNote
            ? props.currentNote.textAreas[0] || "Untitled"
            : "No Note Selected"}
        </ReactMarkdown>
      </div>
      <div className="for-header-menu" onClick={handleClick}>
        <svg
          style={{ cursor: "pointer" }}
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="#0D6EFD"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        {menu && (
          <div className="dark-toggle">
            <HeaderMenu
              darkMode={props.darkMode}
              toggleDarkMode={props.toggleDarkMode}
              onClick={props.toggleDarkMode}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
