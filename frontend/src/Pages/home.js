import React from "react";
import "./home.css";

// import RecordComponent from "../Components/recording";
// import RecordFailedComponent from "../Components/recording-failed";
import SongDetailsComponent from "../Components/song-details";

function Home() {
  return (
    <div className="container">
      {/* <RecordComponent></RecordComponent> */}
      {/* <RecordFailedComponent></RecordFailedComponent> */}
      <SongDetailsComponent></SongDetailsComponent>
    </div>
  );
}

export default Home;
