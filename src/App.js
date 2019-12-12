import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import Routes from "./navigation/Route";
import history from "./navigation/History";
export const SERVER_URL = 'http://localhost:8080';

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
