import React, { Component } from "react";

import Book from "./Book";

const Bookshelf = props => {
  if (props.books.length > 0) {
    let books = props.books.map(el => (
      <li key={el.id}>
        <Book details={el} update={props.update} delOption={props.delOption} />
      </li>
    ));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{books}</ol>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.category}</h2>
        <div className="bookshelf-books">
          <span> No books here</span>
        </div>
      </div>
    );
  }
};

export default Bookshelf;
