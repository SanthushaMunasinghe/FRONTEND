import React from "react";
import "./home.css";

import MicRecorder from 'mic-recorder-to-mp3';

import RecordComponent from "../Components/record";
import RecordingComponent from "../Components/recording";
import RecordFailedComponent from "../Components/recording-failed";
import SongDetailsComponent from "../Components/song-details";

class Home extends React.Component {
  Mp3Recorder = new MicRecorder({ bitRate: 128 });
  
  constructor(props) {
    super(props);
    // const [screenMode, setScreenMode] = useState("start");
    // Audio recorder
    this.recordMode = this.recordMode.bind(this);

    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isRecordClicked: false,
      screenMode: "start",
      SongDetails: {
        songName: "Song Name",
        trackName: "Track Name",
        artistName: "Artist Name",
        albumName: "Album Name",
        label: "Label",
        releaseYear: "Release Year",
      },
    };
  }

  render(){
    return (
      <div className="container">
        {this.state.screenMode==="start" && <RecordComponent recordMode={this.recordMode} />}
        {this.state.screenMode==="listening" && <RecordingComponent /> }
        {this.state.screenMode==="failed" && <RecordFailedComponent /> }
        {this.state.screenMode==="successful" && <SongDetailsComponent /> }
      </div>
    );
  }

  componentDidMount(){
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Mic Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Mic Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  
  // Start recording audio
  startAudio() {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      this.Mp3Recorder
      .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
      }
    }
    // Stop recording audio
  stopAudio() {
    this.Mp3Recorder
    .stop()
    .getMp3()
    .then(([buffer, blob]) => {
      const blobURL = URL.createObjectURL(blob)
      this.setState({ blobURL, isRecording: false }, () => {
        console.log(this.state.blobURL);
      }); 
    }).catch((e) => console.log(e));
  }
  // Change to recording mode
  recordMode(){
    let record_duration = 15000; // 15 seconds = 15000 miliseconds, Audio record duration
    this.setState({screenMode: "listening"});
    this.startAudio();
    setTimeout(() => { // Stops Audio record after 15 seconds
      this.stopAudio();
    }, record_duration);
  }
  

}

export default Home;
