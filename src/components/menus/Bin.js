import React from "react";
import { useState } from "react";

function Bin() {
  const [menu, setMenu] = useState(false);

  function handleClick() {
    setMenu((prev) => !prev);
  }

  return (
    <div className="bin-con" onClick={handleClick}>
      <div className="bin">Recycle Bin</div>
      {menu && (
        <div className="trash-toggle">
          <div>hello</div>
        </div>
      )}
    </div>
  );
}

export default Bin;
