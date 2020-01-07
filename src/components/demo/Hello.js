import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { SERVER_URL } from "../../App";
import axios from "axios";

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: null
    };

    this.sayHello = this.sayHello.bind(this);
  }

  sayHello() {
    axios.get(SERVER_URL + "/user")
      .then(response => {
        this.setState({hello: response.data});
      });
  }

  render() {
    return (
      <div className="App">
        <h1>
          Welcome!
        </h1>
        <Button onClick={this.sayHello}> Say hello </Button>
        <div className={"display-4 mt-5"}> {this.state.hello} </div>
      </div>
    );
  }
}

export default Hello;