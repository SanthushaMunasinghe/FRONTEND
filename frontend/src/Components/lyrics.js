import React from "react";
// import { useState, useEffect } from "react";

import "./song-details.css";

function LyricsComponent() {
  const lyrics = [
    "I found a love,",
    "for meDarling,",
    "just dive right in and follow my leadWell,",
    "I found a girl, beautiful and sweetOh,",
  ];

  return (
    <div className="mt-4">
      <div className="card px-5 py-5" style={{ backgroundColor: "#a5ade2" }}>
        {lyrics.map((line, index) => (
          <p key={index} className="fw-semibold text-center">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default LyricsComponent;
