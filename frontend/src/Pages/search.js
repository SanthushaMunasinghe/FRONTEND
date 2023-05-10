import React from "react";

import "./search-song-details.css";
import handImg from "../assets/HAND.png";

import LyricsComponent from "../Components/lyrics";

function Search(props) {
  let chordList = props.details.Chords.split(" ");
  let MajchordImgs, MinchordImgs, SevenchordImgs;
  let majorChordUrls, minorChordUrls, seventhChordUrls;

  for(let chord of chordList){
    if(chord.substring(chord.length - 1)==="m"){
      MinchordImgs = require.context(
        "../assets/chords-Images/Minor",
        false,
        `/^${chord}\.(png|jpe?g|svg)$/`
      );
    } else if(chord.substring(chord.length - 1)==="7"){
      SevenchordImgs = require.context(
        "../assets/chords-Images/7th",
        false,
        `/^${chord}\.(png|jpe?g|svg)$/`
      );
    } else {
      MajchordImgs = require.context(
        "../assets/chords-Images/Major",
        false,
        `/^${chord}\.(png|jpe?g|svg)$/`
      );
    }
  }
  if(MajchordImgs){ const majorChordUrls = MajchordImgs.keys().map(MajchordImgs);}
  if(MinchordImgs){ const minorChordUrls = MinchordImgs.keys().map(MinchordImgs);}
  if(SevenchordImgs){ const seventhChordUrls = SevenchordImgs.keys().map(SevenchordImgs);}

  return (
    <div className="container">
      <div className="mt-4 mt-4 d-flex justify-content-center align-items-center flex-column">
        <h3 className="fw-bolder mb-4">Hand Positions For Chords</h3>
        <img src={handImg} alt="hand" style={{ width: "300px" }}></img>
      </div>
      <div className="mt-4">
        <h3 className="fw-bolder">Chords for the song</h3>
        <div
          className="mt-4"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "3px",
            justifyItems: "center",
          }}
        >
          {majorChordUrls && majorChordUrls.map((url, index) => (
            <div>
              <img src={url} alt={`${index}`} style={{ width: "200px" }} />
              <p className="mt-2 fw-semibold">
                {url.split("/").pop().split(".")[0]}
              </p>
            </div>
          ))}
          {minorChordUrls && minorChordUrls.map((url, index) => (
            <div>
              <img src={url} alt={`${index}`} style={{ width: "200px" }} />
              <p className="mt-2 fw-semibold">
                {url.split("/").pop().split(".")[0]}
              </p>
            </div>
          ))}
          {seventhChordUrls && seventhChordUrls.map((url, index) => (
            <div>
              <img src={url} alt={`${index}`} style={{ width: "200px" }} />
              <p className="mt-2 fw-semibold">
                {url.split("/").pop().split(".")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
      { props.details.Lyrics && <LyricsComponent Lyrics={props.details.Lyrics} />}
    </div>
  );
}

export default Search;
