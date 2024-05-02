import React, { Component } from "react";
import NotesDataService from "../services/notes.service";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveNotes = this.retrieveNotes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNotes = this.setActiveNotes.bind(this);
    this.removeAllNotes = this.removeAllNotes.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      notes: [],
      currentNotes: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveNotes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveNotes() {
    NotesDataService.getAll()
      .then((response) => {
        this.setState({
          notes: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNotes();
    this.setState({
      currentNotes: null,
      currentIndex: -1,
    });
  }

  setActiveNotes(notes, index) {
    this.setState({
      currentNotes: notes,
      currentIndex: index,
    });
  }

  removeAllNotes() {
    NotesDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentNotes: null,
      currentIndex: -1,
    });

    NotesDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          notes: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, notes, currentNotes, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Notes List</h4>

          <ul className="list-group">
            {notes &&
              notes.map((note, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNotes(note, index)}
                  key={index}
                >
                  {note.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllNotes}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentNotes ? (
            <div>
              <h4>Notes</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentNotes.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentNotes.description}
              </div>

              <Link
                to={"/notes/" + currentNotes.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Notes...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
