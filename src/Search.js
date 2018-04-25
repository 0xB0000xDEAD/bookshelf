import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import _ from "lodash";

class Search extends Component {
  state = {
    searchResults: [],
    apiError: false
  };

  handleChange = event => {
    let query = event.target.value;
    if (query) {
      BooksAPI.search(query.toString()).then(response => {
        // console.log('api says: ',response);
        if (response.error) {
          this.setState({ apiError: true, searchResults: [] });
          // console.log("please use the  good terms");
        } else {
          for (const result of response) {
            Object.defineProperty(result, "shelf", {
              value: "none",
              writable: true
            });
            for (const book of this.props.books) {
              if (result.id === book.id) {
                console.log(
                  `"${result.title}" from ${result.authors} is already in your bookcase [${
                    book.shelf
                  }]`
                );
                result.shelf = book.shelf;
              }
            }
          }
          console.log(response);
          
          this.setState({ searchResults: response, apiError: false });
        }
      });
    } else this.setState({ searchResults: [] });
  };
  debounceTest = event => {
    console.log("bounce!");

    _.debounce(() => {
      console.log("debounce!!!");
    }, 500);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    let results = this.state.searchResults.map(el => (
      <li key={el.id}>
        <Book details={el} update={this.props.update} />
      </li>
      // <li key={Math.random()}>
      //   <p>|=|,</p>
      // </li>
    ));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit} className="create-contact-form">
              <input
                type="text"
                name="query"
                placeholder="Search by title or author"
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          {this.state.apiError === true && (
            <span className="queryAlert">please use the good terms</span>
          )}

          {results.length > 0 && <ol className="books-grid">{results}</ol>}
        </div>
      </div>
    );
  }
}

export default Search;
