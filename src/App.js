import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import Routes from "./navigation/Route";
import history from "./navigation/History";
export const SERVER_URL = 'http://localhost:8080';

function App() {
  return (
    <div className={"background"}>
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
