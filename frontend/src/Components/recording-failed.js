import React from "react";
import "./recording.css";

function RecordFailedComponent() {
  return (
    <div className="container">
      <div className="container-record">
        <div className="record-content d-flex flex-column align-items-center justify-content-center">
          <h5 className="text-center">Tap To Start</h5>
          <a href="/"><button className="btn btn-dark mt-3">Try Again</button></a>
        </div>
      </div>
    </div>
  );
}

export default RecordFailedComponent;
