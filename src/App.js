import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

import { Switch, Route } from "react-router";

import Search from "./Search";
import List from "./List";
import NotFound from "./NotFound";

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
      // console.log("this are the books in yourBookcase: \n");
      // for (const el of books) {
      //   console.log(`${el.title}(${el.id}) ===> ${el.shelf}`);
      // }
      this.setState({ all: books });
    });
  }

  update = (book, shelf) => {
    BooksAPI.get(book.id).then(response => {
      console.log(response);
      if (response.shelf === "none") {
        BooksAPI.update(book, shelf).then(() => {
          let tmp = response;
          response.shelf = shelf;
          this.setState(state => ({
            all: state.all.filter(e => e.id !== tmp.id).concat([tmp])
          }));
        });
      } else {
        let match = this.state.all.find(el => {
          return el.id === book.id;
        });
        if (shelf !== "none") {
          BooksAPI.update(book, shelf).then(() => {
            match.shelf = shelf;
            this.setState(state => ({
              all: state.all.filter(e => e.id !== match.id).concat([match])
            }));
          });
        } else {
          BooksAPI.update(book, shelf).then(() => {
            match.shelf = shelf;
            this.setState(state => ({
              all: state.all.filter(e => e.id !== match.id)
            }));
          });
        }
      }
    });
  };
  render() {
   
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <List
              update={this.update}
              books={this.state.all}
              delOption={false}
            />
          )}
        />
        <Route
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
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default BooksApp;
