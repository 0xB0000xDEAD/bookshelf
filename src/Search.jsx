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

  // handleChangeThrottled = () => {
  //   // console.log(this.count.length); //ok
  //   console.log(".");

  //   _.debounce(function(c) {
  //     c.push("+");
  //     // console.log("===> *");
  //     console.log(c.length);
  //   }, 1000)(this.count);
  // };

  handleChange = event => {
    let query = event.target.value.trim();
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

  // handleChange = event => {
  //   this.props.search(event.target.value);
  // }

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    // let results = this.state.searchResults.map(el => (
    //   <li key={el.id}>
    //     <Book id={el.id} details={el} update={this.props.update} />
    //   </li>
    // ));

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
            {/* <form onSubmit={this.handleSubmit} className="create-contact-form">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.handleChange}
              />
            </form> */}
          </div>
        </div>
        {/* <Filter results={this.state.searchResults} apiError={this.state.apiError} /> */}
        <Results
          results={this.state.searchResults}
          apiError={this.state.apiError}
          delOption={this.props.delOption}
        />

        {/* <div className="search-books-results">
          {this.state.apiError === true && (
            <span className="queryAlert">please use the good terms</span>
          )}
          {results.length > 0 && <ol className="books-grid">{results}</ol>}
        </div> */}
      </div>
    );
  }
}

export default Search;
