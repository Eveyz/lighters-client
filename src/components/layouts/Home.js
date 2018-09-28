import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    // fetch('/users')
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(users => {
    //     this.setState({ users })
    //   });
  }

  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <h2>LOL</h2>
          <Link to="/books">Books</Link>
        </main>
      </div>
    );
  }
}

export default Home;