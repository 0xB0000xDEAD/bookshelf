import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

import { Route } from "react-router-dom";
import Search from "./Search";
import List from "./List";

class BooksApp extends React.Component {
  state = {
    all: []
  };
  componentDidMount() {
    this.getAll();
  }
  getAll() {
    BooksAPI.getAll().then(books => {
      // console.log('this are the books in yourBookcase: \n');
      // for (const el of books) {
      //   // console.log(el.title, el.id, el.shelf.toUpperCase());
      //   console.log(`${el.title} ===> ${el.shelf}`);
      // }
      this.setState({ all: books });
    });
  }
  update = (book, shelf) => {
    console.log(`id ${book.id} moved to ${shelf}`);
    let trick = this;
    // console.log(trick);

    BooksAPI.update(book, shelf).then(function(response) {
      // console.log(response);
      trick.getAll();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <List update={this.update} books={this.state.all} />}
        />
        <Route
          exact
          path="/search"
          render={() => <Search update={this.update} books={this.state.all} />}
        />
      </div>
    );
  }
}

export default BooksApp;
