import React from "react";

export default ({ light, infrared }) => (
  <div className="card bg-dark text-white">
    <div className="card-body">
      <div className="card-title h5">Sensor Status</div>
      <div className="container">
        <div className="card-text float-left">Light Sensor: {light}</div>
        <br />
        <div className="card-text float-left">Infrared Sensor: {infrared}</div>
      </div>
    </div>
  </div>
);
