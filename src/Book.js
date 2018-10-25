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
              backgroundImage: `url(${details.imageLinks.smallThumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={details.shelf}
              onChange={e => {
                update({ id: details.id }, e.target.value);
                details.shelf = e.target.value;
              }}
            >
              <option value="none" disabled={this.props.delOption}>
                Move to...
              </option>
              <option value="wantToRead"> Want to Read</option>
              <option value="read">Read</option>
              <option value="currentlyReading">Currently Reading</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.details.title}</div>
        <div className="book-authors">
          {Array.isArray(this.props.details.authors)
            ? this.props.details.authors.join(", ")
            : ""}
        </div>
      </div>
    );
  }
}

export default Book;
