import React, { Component } from "react";
import Book from "./Book";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faStar from "@fortawesome/fontawesome-free-solid/faStar";
import faStarHalf from "@fortawesome/fontawesome-free-solid/faStarHalf";

class Results extends Component {
  state = {
    starsNumber: 5,
    defaultRating: 3,
    stars: [],
    rating: 3
  };

  componentDidMount() {
    // create the star state array
    let tmp = [];
    for (let i = 0; i < this.state.starsNumber; i++) {
      if (i <= this.state.defaultRating - 1) {
        tmp.push(1);
      } else {
        tmp.push(0);
      }
    }
    this.setState({ stars: tmp });

    let target = document.getElementById("star-board");

    target.addEventListener("click", () => {
      this.setState((prev, props) => {
        let c = 0;
        let tmp = prev.stars;
        if (tmp[this.state.starsNumber - 1] === 1) {
          c = -0.5;
          tmp.fill(0);
        } else {
          for (const el of tmp) {
            if (el === 1) {
              c++;
            }
            if (el === 0.5) {
              c += 0.5;
            }
          }
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] === 0) {
              tmp[i] = 0.5;
              break;
            }
            if (tmp[i] === 0.5) {
              tmp[i] = 1;
              break;
            }
            if (tmp[i] === 1) {
              //
            }
          }
        }

        return { rating: c + 0.5 };
      });
    });
  }

  render() {
    let noReview = this.props.results
      .filter(el => {
        return !el.averageRating;
      })
      .map(el => (
        <li key={el.id}>
          <Book
            id={el.id}
            details={el}
            update={this.props.update}
            delOption={this.props.delOption}
          />
        </li>
      ));

    let results = this.props.results
      .filter(el => {
        return el.averageRating && el.averageRating === this.state.rating;
      })

      .map(el => (
        <li key={el.id}>
          <Book
            id={el.id}
            details={el}
            update={this.props.update}
            delOption={this.props.delOption}
          />
        </li>
      ));

    // rendering the stars
    let stars = this.state.stars.map(el => {
      if (el === 0.5) {
        return (
          <li key={Math.random()}>
            <FontAwesomeIcon
              id={Math.random()}
              icon={faStarHalf}
              color="yellow"
            />
          </li>
        );
      }
      if (el === 1) {
        return (
          <li key={Math.random()}>
            <FontAwesomeIcon id={Math.random()} icon={faStar} color="yellow" />
          </li>
        );
      } else {
        return (
          <li key={Math.random()}>
            <FontAwesomeIcon id={Math.random()} icon={faStar} color="gray" />
          </li>
        );
      }
    });
    return (
      <div className="filter-board">
        <div id="star-board">
          <h2>Please select the average rating</h2>
          <ol className="star-list">{stars}</ol>
        </div>

        <div className="search-books-results">
          {this.props.apiError === true && (
            <span className="queryAlert">please use the good terms</span>
          )}
          <h4 className="filter-on-alert">
            Now showing {results.length} of {this.props.results.length}
          </h4>
          <ol className="books-grid">{results}</ol>
        </div>

        <div className="search-books-results">
          {noReview.length > 0 && (
            <h4 className="no-review-alert">
              {noReview.length} with no review avalaible
            </h4>
          )}
          <ol className="books-grid">{noReview}</ol>
        </div>
      </div>
    );
  }
}

export default Results;
