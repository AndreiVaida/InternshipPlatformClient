import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav";
import "./NavigationBar.css";
import { UserAccountService } from "../../services/UserAccountService";
import history from "../../navigation/History";
import EventEmitter from "../../utils/EventEmitter";
import { EventType } from "../../utils/EventType";
import { UserType } from "../../domain/UserType";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserAccountService.getLoggedUser(),
      isAuthenticated: UserAccountService.isAuthenticated(),
    };
    EventEmitter.subscribe(EventType.UserAccountChanged, () => {
      this.loadUserAccount();
    });
  }

  loadUserAccount = () => {
    this.setState({
      user: UserAccountService.getLoggedUser(),
      isAuthenticated: UserAccountService.isAuthenticated(),
    })
  };

  logout = () => {
    UserAccountService.logout();
    history.push("/login");
  };

  render() {
    return(
      <Navbar className={"navbar"} expand="lg">
        <Navbar.Brand href="/home" className={"darkenHover_80"}>Internships</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"> {
            this.state.isAuthenticated && this.state.user.userType === UserType.COMPANY &&
              <Nav>
                <Nav.Link href="/addInternship" className={"darkenHover_80"}> Add internship </Nav.Link>
              </Nav>
          }
          </Nav>
          <Nav className="ml-auto"> {
              this.state.isAuthenticated ?
                <Nav>
                  <Navbar.Brand href="/hello" className={"darkenHover_80"}> {this.state.user.name} </Navbar.Brand>
                  <Nav.Link onClick={this.logout} className={"darkenHover_80"}> Logout </Nav.Link>
                </Nav>
                :
                <Nav>
                  <Nav.Link href="/login" className={"darkenHover_80"}>Login</Nav.Link>
                  <Nav.Link style={{cursor: "context-menu"}}>or</Nav.Link>
                  <Nav.Link href="/register" className={"darkenHover_80"}>Create an account</Nav.Link>
                </Nav>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;