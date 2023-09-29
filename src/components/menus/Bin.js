import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Bin() {
  const [menu, setMenu] = useState(false);

  function handleClick() {
    setMenu((prev) => !prev);
  }

  return (
    <div className="bin-con" onClick={handleClick}>
      <Button type="button" className="btn btn-outline-secondary">
        Recycle Bin
      </Button>
      {menu && (
        <div className="trash-toggle">
          <div>hello</div>
        </div>
      )}
    </div>
  );
}

export default Bin;
