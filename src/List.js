import React, { Component } from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";

class List extends Component {
  state = {
    wantToRead: [],
    read: [],
    reading: []
  };

  test() {
    console.log(this.props);
    let wantToRead = [];
    let read = [];
    let reading = [];

    for (const el of this.props.books) {
      let target = el.shelf;

      switch (target) {
        case "wantToRead":
          wantToRead.push(el);
          break;
        case "read":
          read.push(el);
          break;
        case "currentlyReading":
          reading.push(el);
          break;

        default:
          break;
      }
    }
    console.log(this.state);
    this.setState({ read: read });
  }

  render() {
    console.log(this.props);

    let wantToRead = [];
    let read = [];
    let reading = [];

    for (const el of this.props.books) {
      let target = el.shelf;

      switch (target) {
        case "wantToRead":
          wantToRead.push(el);
          break;
        case "read":
          read.push(el);
          break;
        case "currentlyReading":
          reading.push(el);
          break;
        default:
          break;
      }
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Books</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf
            books={wantToRead}
            category={"Wanto to Read"}
            update={this.props.update}
          />
          <Bookshelf
            books={read}
            category={"Read"}
            update={this.props.update}
          />
          <Bookshelf
            books={reading}
            category={"Currently Reading"}
            update={this.props.update}
          />
        </div>
        <div className="open-search">
          <Link className="close-search" to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default List;
