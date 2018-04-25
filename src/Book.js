import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    update: PropTypes.func
  };

  render() {
    const { update } = this.props;
    const { details } = this.props;

    if (details.imageLinks === undefined) {
      // console.log(`item with id: ${details.id} has no thumbnail to show `);
      Object.defineProperty(details, "imageLinks", {
        value: { smallThumbnail: "" }
      });
    }

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                this.props.details.imageLinks.smallThumbnail
              })`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.props.details.shelf}
              onChange={e => {
                update({ id: this.props.details.id }, e.target.value);
                // window.location.href = "/";
              }}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="wantToRead"> Want to Read</option>
              <option value="read">Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.details.title}</div>
        <div className="book-authors">{this.props.details.authors}</div>
      </div>
    );
  }
}

export default Book;
