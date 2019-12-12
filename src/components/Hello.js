import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { SERVER_URL } from "../App";

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: null
    };

    this.sayHello = this.sayHello.bind(this);
  }

  sayHello() {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => {
      const hello = request.response;
      this.setState({hello: hello.toString()});
    });

    request.open('GET', SERVER_URL + "/user");
    request.send();
  }

  render() {
    return (
      <div className="App">
        <h1>
          Hello world !
        </h1>
        <Button onClick={this.sayHello}> Say hello </Button>
        <div className={"display-4 mt-5"}> {this.state.hello} </div>
      </div>
    );
  }
}

export default Hello;