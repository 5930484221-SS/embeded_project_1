import React from "react";

export default ({ isOn, mode, setOn }) => (
  <div className="text-center mt-3">
    {isOn === 1 ? (
      <div>
        <i className="far fa-lightbulb fa-10x mb-3" />
        <div className="ml-2 h3 text-success">ON</div>
        {mode === 1 && (
          <i
            style={{ cursor: "pointer" }}
            onClick={() => setOn(0)}
            className="fas fa-toggle-on fa-2x"
          />
        )}
      </div>
    ) : (
      <div>
        <i className="fas fa-lightbulb fa-10x mb-3" />
        <div className="ml-2 h3 text-danger">OFF</div>
        {mode === 1 && (
          <i
            style={{ cursor: "pointer" }}
            onClick={() => setOn(1)}
            className="fas fa-toggle-off fa-2x"
          />
        )}
      </div>
    )}
  </div>
);
