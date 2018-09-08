import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import '../css/App.css';
import Home from './layouts/Home';

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
  </div>
)

export default App;
