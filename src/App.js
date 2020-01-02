import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import Routes from "./navigation/Route";
import history from "./navigation/History";
import NavigationBar from "./components/environment/NavigationBar";
export const SERVER_URL = 'http://localhost:8080';

function App() {
  return (
    <div className={"background"}>
      <NavigationBar />
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
