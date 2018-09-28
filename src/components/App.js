import React from 'react';
import { Route } from 'react-router-dom';

import '../css/App.css';
import Home from './layouts/Home';
import BookList from '../containers/books/BookList';

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/books" component={BookList} />
  </div>
)

export default App;
