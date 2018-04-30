import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

import { Route } from "react-router-dom";
import Search from "./Search";
import List from "./List";

class BooksApp extends React.Component {
  state = {
    all: [],
    searchResults: []
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
  search(query) {
    console.log(`searching for "${query}"`);

    if (query) {
      BooksAPI.search(query.toString()).then(response => {
        console.log("api says: ", response);
        if (response.error) {
          this.setState({ apiError: true, searchResults: [] });
          // console.log("please use the  good terms");
        } else {
          for (const result of response) {
            Object.defineProperty(result, "shelf", {
              value: "none",
              writable: true
            });
            let trick = this;
            console.log(trick);

            for (const book of this.books) {
              if (result.id === book.id) {
                console.log(
                  `"${result.title}" from ${
                    result.authors
                  } is already in your bookcase [${book.shelf}]`
                );
                result.shelf = book.shelf;
              }
            }
          }

          this.setState({ searchResults: response, apiError: false });
        }
      });
    } else this.setState({ searchResults: [] });
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
          render={() => <List update={this.update} books={this.state.all} delOption={false} />}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              search={this.search}
              update={this.update}
              books={this.state.all}
              searchResults={this.state.searchResults}
              delOption={true}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
