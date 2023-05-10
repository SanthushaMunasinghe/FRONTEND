import React from "react";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./Pages/home";
import ChordsLibrary from "./Pages/chords-library-page";
import Search from "./Pages/search";
//Images
import logoImg from "./assets/ftontend-logo.png";
import { render } from "@testing-library/react";

import { FaSpinner } from "react-icons/fa";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      searchStatus: "",
      searchData: [],
      searchSelection: "",
    };

    this.handleSearch = this.handleSearch.bind(this);
  }


  handleSearch(event) {
    this.setState({searchText: event.target.value});
    if (event.target.value.length > 0) {
        let searchTimeout = setTimeout(() => {
          this.setState({searchStatus: "loading"});
          // const data = new FormData();
          // data.append("searchKey", event.target.value);
          const data ={
            "searchKey": event.target.value,
          };
          fetch(`http://localhost:8080/findSong`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then(
            res => {
              if(res.status !== 200){
                throw new Error('Failed to fetch data')
              }
              return res.json()
            }).then(data =>{
              this.setState({searchStatus: "success", searchData: data}, () => console.log(this.state.searchData && this.state.searchData.slice(0, 5).map((item, index) =>
                  <div className="search-dropdown-item" key={index} onClick={() => {this.setState({searchSelection: this.state.searchData[index]}, () => {return redirect("/search");})}}>
                    <h1>{item}</h1>
                  </div>
              )));
            }).catch(err => {
            console.error('error:' + err);
            this.setState({searchStatus: "error"});
          });
        }, 1000);
      }
    }

  render(){
    return (
      <Router>
        <div className="navbar-style">
          <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">
                  <img src={logoImg} alt="logo" className="logo-img"></img>
                </a>
                <div className="collapse navbar-collapse" id="navbarScroll">
                  <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll px-5">
                    <li className="nav-item">
                      <a
                        className="nav-link active text-white fw-semibold"
                        aria-current="page"
                        href="/"
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active d-inline-block text-white fw-semibold"
                        aria-current="page"
                        href="/chordslibrary"
                      >
                        Chords Library
                      </a>
                    </li>
                  </ul>
                  <div className="navbar-right">
                    <form className="d-flex search-bar" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={this.state.searchText}
                        onChange={this.handleSearch}
                        onBlur={() => {this.setState({searchStatus: ""})}}
                      />
                      <button className="btn btn-dark search-btn" type="submit">
                        {this.state.searchStatus==="loading"?<span className="spinner"><FaSpinner/></span>:"Search"}
                      </button>
                    </form>
                    {
                    (this.state.searchStatus === "success") &&
                    <div className="search-dropdown">
                      {this.state.searchData && this.state.searchData.slice(0, 5).map((item, index) =>
                          <div className="search-dropdown-item" key={index} onClick={() => {this.setState({searchSelection: this.state.searchData[index]}, () => {return redirect("/search");})}}>
                            <h1>{item}</h1>
                            <p>{item["Song Artist"]}</p>
                          </div>
                      )}
                    </div>
                    }
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/chordslibrary" Component={ChordsLibrary} />
          <Route exact path="/search" element={<Search details={this.state.searchSelection}/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
