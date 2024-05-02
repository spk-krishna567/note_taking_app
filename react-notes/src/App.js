import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNotes from "./components/add-notes.component";
import Notes from "./components/notes.component";
import NotesList from "./components/notes-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/notes"} className="navbar-brand">
            Note Taking
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/notes"} className="nav-link">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Note
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<NotesList />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/add" element={<AddNotes />} />
            <Route path="/notes/:id" element={<Notes />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
