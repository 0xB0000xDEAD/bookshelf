import React, { Component } from "react";
// import Well from ""
import ghost from "../assets/404-error.jpg";

class NotFound extends Component {
  render() {
    return (
      <div className="notfound">
        <img src={ghost}  alt="page not found"/>
        <p>Page Not Found</p> 
      </div>
    );
  }
}

export default NotFound;
