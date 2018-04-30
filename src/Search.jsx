import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import _ from "lodash";
import { DebounceInput } from "react-debounce-input";
import Results from "./Results";

class Search extends Component {
  state = {
    searchResults: [],
    apiError: false
  };
  count = [];

  handleChange = event => {
    let query = event.target.value.trim();
    console.log(`searching for "${query}"`);

    if (query) {
      BooksAPI.search(query.toString()).then(response => {
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
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit} className="create-contact-form">
              <DebounceInput
                element="input"
                minLength={2}
                debounceTimeout={750}
                onChange={this.handleChange}
                placeholder={"search for a Book"}
              />
            </form>
          </div>
        </div>
        <Results
          results={this.state.searchResults}
          update={this.props.update}
          apiError={this.state.apiError}
          delOption={this.props.delOption}
        />
      </div>
    );
  }
}

export default Search;
