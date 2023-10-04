import React from "react";

function HeaderMenu(props) {
  return (
    <nav>
      <div className="toggler">
        <div className="toggler--light">Light</div>
        <div className="toggler--slider" onClick={props.toggleDarkMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <div className="toggler--dark">Dark</div>
      </div>
    </nav>
  );
}

export default HeaderMenu;
