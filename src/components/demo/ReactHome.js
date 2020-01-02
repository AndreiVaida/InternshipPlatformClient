import React, { Component } from "react";
import logo from '../../logo.svg';
import history from "../../navigation/History";
import { Button } from "react-bootstrap";

class ReactHome extends Component {

  navigateToHello() {
    history.push("/hello")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button onClick={this.navigateToHello}> Navigate to /hello </Button>
        </header>
      </div>
    );
  }
}

export default ReactHome;