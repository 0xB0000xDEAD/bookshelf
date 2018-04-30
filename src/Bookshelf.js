import React, { Component } from "react";

import Book from "./Book";

class Bookshelf extends Component {
  render() {
    if (this.props.books.length > 0) {
      let books = this.props.books.map(el => (
        <li key={el.id}>
          <Book details={el} update={this.props.update} delOption={this.props.delOption} />
        </li>
      ));

      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.category}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">{books}</ol>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.category}</h2>
          <div className="bookshelf-books">
            <span> No books here</span>
          </div>
        </div>
      );
    }
  }
}

export default Bookshelf;
