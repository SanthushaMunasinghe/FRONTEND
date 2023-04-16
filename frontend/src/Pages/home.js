import React from "react";
import "./home.css";

import MicRecorder from 'mic-recorder-to-mp3';


import RecordComponent from "../Components/record";
import RecordingComponent from "../Components/recording";
import RecordFailedComponent from "../Components/recording-failed";
import SongDetailsComponent from "../Components/song-details";
import LoadingComponent from "../Components/loading";

class Home extends React.Component {
  Mp3Recorder = new MicRecorder({ bitRate: 128 });

  constructor(props) {
    super(props);
    // const [screenMode, setScreenMode] = useState("start");
    // Audio recorder
    this.recordMode = this.recordMode.bind(this);
    this.sendRecording = this.sendRecording.bind(this);
    this.restartSite = this.restartSite.bind(this);

    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isRecordClicked: false,
      screenMode: "start",
      // Response states
      songName: "Song Name",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      label: "Label",
      releaseYear: "Release Year",
      videoLink: "link",
    };
  }

  render(){
    return (
      <div className="container">
        {this.state.screenMode==="start" && <RecordComponent recordMode={this.recordMode} />}
        {this.state.screenMode==="listening" && <RecordingComponent /> }
        {this.state.screenMode==="loading" && <LoadingComponent /> }
        {this.state.screenMode==="failed" && <RecordFailedComponent retryFunction={this.restartSite} /> }
        {this.state.screenMode==="successful" && <SongDetailsComponent
          Song={this.state.songName}
          Artist={this.state.artistName}
          Track={this.state.trackName}
          Album={this.state.albumName}
          Label={this.state.label}
          Released={this.state.releaseYear}
          VideoLink={this.state.videoLink}
          /> }
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
    let record_duration = 1000; // 15 seconds = 15000 miliseconds, Audio record duration
    this.setState({screenMode: "listening"});
    this.startAudio();
    setTimeout(() => { // Stops Audio record after 15 seconds
      this.stopAudio()
      this.sendRecording();
    }, record_duration);
  }
  // Send file to API
  sendRecording(){
    this.setState({screenMode: "loading"});
    const data = new FormData();
    data.append("file", this.state.blobURL);
    fetch(`http://localhost:9200/song`, 
      {
        body: data,
        method: "POST"
      }
    ).then(
      res => {
        if(res.status === 200){
          // set data
          this.setState(
            {
              songName: res.json.song,
              trackName: res.json.track,
              artistName: res.json.artist,
              albumName: res.json.album,
              label: res.json.label,
              releaseYear: res.json.release,
            }
          )
          // swap component
          this.setState({screenMode: "successful"})
        } else{
          this.setState({screenMode: "failed"})
        }
      }).catch(err => {
      console.error('error:' + err)
      this.setState({screenMode: "failed"})
    });
  }
  // Restart the site
  restartSite(){
    // reset all the states
    this.setState({
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isRecordClicked: false,
      screenMode: "start",
      // Response states
      songName: "Song Name",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      label: "Label",
      releaseYear: "Release Year",
      videoLink: "link",
    });
  }

}

export default Home;
