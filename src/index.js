import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './assets/styles/main.scss';
import {HashRouter as Router } from 'react-router-dom'


ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);
