import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//Components
import Home from "./components/home";

//Images
import logoImg from "./assets/ftontend-logo.png";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={logoImg} alt="logo" className="logo-img"></img>
            </a>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active d-inline-block"
                    aria-current="page"
                    href="/chordslibrary"
                  >
                    Chords Library
                  </a>
                </li>
              </ul>
              <form className="d-flex" role="search">
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
            </div>
          </div>
        </nav>
      </div>

      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/chordslibrary" Component={Home} />
        <Route exact path="/songpage" Component={Home} />
        <Route exact path="/songlyrics" Component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
