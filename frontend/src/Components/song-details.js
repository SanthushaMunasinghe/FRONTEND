import React from "react";
import "./song-details.css";
import { FaPlayCircle } from "react-icons/fa";
import { MdQueueMusic } from "react-icons/md";

function SongDetailsComponent() {
  return (
    <div className="container">
      <div className="album-art"></div>
      <div className="details-bar px-5 py-3 bg-dark">
        <div className="text-white">
          <h2>Song Name</h2>
          <h5>Artist Name</h5>
        </div>
        <div className="text-white d-flex justify-content-end align-items-center">
          <div className="lyrics-button d-flex px-3 py-2 rounded me-5">
            <h2 className="fw-bolder me-2">Lyrics</h2>
            <MdQueueMusic className="fs-1" />
          </div>
          <div className="play-button d-flex px-3 py-2 rounded">
            <h2 className="fw-bolder me-2">Play</h2>
            <FaPlayCircle className="fs-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetailsComponent;
