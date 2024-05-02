import React, { Component } from "react";
import NotesDataService from "../services/notes.service";
import { withRouter } from "../common/with-router";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.deleteNotes = this.deleteNotes.bind(this);

    this.state = {
      currentNotes: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    console.log(this.props.router.params.id);
    this.getNotes(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentNotes: {
          ...prevState.currentTNotes,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentNotes: {
        ...prevState.currentNotes,
        description: description,
      },
    }));
  }

  getNotes(id) {
    NotesDataService.get(id)
      .then((response) => {
        this.setState({
          currentNotes: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentNotes.id,
      title: this.state.currentNotes.title,
      description: this.state.currentNotes.description,
      published: status,
    };

    NotesDataService.update(this.state.currentNotes.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentNotes: {
            ...prevState.currentNotes,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateNotes() {
    NotesDataService.update(this.state.currentNotes.id, this.state.currentNotes)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The notes was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteNotes() {
    NotesDataService.delete(this.state.currentNotes.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/notes");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentNotes } = this.state;

    return (
      <div>
        {currentNotes ? (
          <div className="edit-form">
            <h4>Notes</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentNotes.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentNotes.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNotes}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateNotes}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Notes...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Notes);
