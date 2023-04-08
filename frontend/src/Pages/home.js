import React from "react";
import "./home.css";
// import RecordComponent from "../Components/recording";
import RecordFailedComponent from "../Components/recording-failed";

function Home() {
  return (
    <div className="container">
      {/* <RecordComponent></RecordComponent> */}
      <RecordFailedComponent></RecordFailedComponent>
    </div>
  );
}

export default Home;
