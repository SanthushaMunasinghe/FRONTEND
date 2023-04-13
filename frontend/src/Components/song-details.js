import React from "react";
// import { useState, useEffect } from "react";

import "./song-details.css";

import LyricsComponent from "./lyrics";
import { FaPlayCircle } from "react-icons/fa";
import { MdQueueMusic } from "react-icons/md";
import testThumbnail from "../assets/OIP 1.png";

function SongDetailsComponent(props) {
  return (
    <div>
      <div className="album-art"></div>
      <div className="details-bar px-5 py-3 bg-dark">
        <div className="text-white">
          <h2>{props.Song}</h2>
          <h5>{props.Artist}</h5>
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
      <div className="song-info-grid mt-5">
        <div>
          <h5 className="fw-bolder">VIDEO</h5>
          <div>
            <a
              href={props.VideoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={testThumbnail}
                className="thumbnail"
                alt="Video Thumbnail"
              />
            </a>
          </div>
        </div>
        <div>
          <h5 className="fw-bolder">TRACK INFROMATION</h5>
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <p className="fw-bolder mb-4">Track</p>
                <p className="fw-bolder mb-4">Album</p>
                <p className="fw-bolder mb-4">Label</p>
                <p className="fw-bolder mb-4">Released</p>
              </div>
              <div class="col text-end">
                <p className="fw-bolder mb-4">{props.Track}</p>
                <p className="fw-bolder mb-4">{props.Album}</p>
                <p className="fw-bolder mb-4">{props.Label}</p>
                <p className="fw-bolder mb-4">{props.Released}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LyricsComponent />
    </div>
  );
}

export default SongDetailsComponent;
