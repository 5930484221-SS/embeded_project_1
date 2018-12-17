import React from "react";

export default ({ mode, setMode }) => (
  <div className="text-center mt-3">
    <div className="btn-group">
      <button
        onClick={() => setMode(0)}
        style={{ width: "10rem" }}
        className="btn btn-warning"
      >
        Auto Mode
      </button>
      <button
        onClick={() => {
          setMode(1);
        }}
        style={{ width: "10rem" }}
        className="btn btn-dark"
      >
        Manual Mode
      </button>
    </div>
    <div className="h3 mt-3">{mode === 0 ? "Auto Mode" : "Manual Mode"}</div>
  </div>
);
