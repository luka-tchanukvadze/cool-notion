import React, { useState } from "react";
import HeaderMenu from "./menus/HeaderMenu";
// import { useState } from "react";
import { ThreeBarsIcon } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Header(props) {
  const [menu, setMenu] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  function handleClick() {
    setMenu((prev) => !prev);
  }

  return (
    <header className="header">
      <div className="header-text" style={{}}>
        {props.currentNote
          ? props.currentNote.body.split("\n")[0] || "Untitled"
          : "No Note Selected"}
      </div>
      <div className="for-header-menu" onClick={handleClick}>
        <svg
          style={{ cursor: "pointer" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#0D6EFD"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        {menu && (
          <div className="dark-toggle">
            <HeaderMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
