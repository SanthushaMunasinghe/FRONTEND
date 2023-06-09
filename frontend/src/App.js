import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./Pages/home";
import ChordsLibrary from "./Pages/chords-library-page";
//Images
import logoImg from "./assets/ftontend-logo.png";
import googleImg from "./assets/googleicon.png";

function App() {
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
                    />
                    <button className="btn btn-dark" type="submit">
                      Search
                    </button>
                  </form>
                  <button className="btn btn-white bg-white rounded-pill">
                    <img
                      src={googleImg}
                      alt="signUp"
                      className="signup-icon"
                    ></img>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/chordslibrary" Component={ChordsLibrary} />
      </Routes>
    </Router>
  );
}

export default App;
