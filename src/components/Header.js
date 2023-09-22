import React, { useState } from "react";
import HeaderMenu from "./menus/HeaderMenu";
// import { useState } from "react";

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
      <div className="header-text">
        {props.currentNote
          ? props.currentNote.body.split("\n")[0]
          : "No Note Selected"}
      </div>
      <div className="for-header-menu" onClick={handleClick}>
        <button className="header-button">=</button>
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
