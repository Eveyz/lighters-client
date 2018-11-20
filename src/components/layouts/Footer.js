import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer blue-grey darken-3">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Lighters</h5>
              <p className="grey-text text-lighten-4">在Lighters,我们关注每个学生的学习和成长.</p>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Lighters专属</h5>
              <ul>
                <li><Link to="/" className="grey-text text-lighten-3" href="#!">Link 1</Link></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
              </ul>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text">加入我们</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">我想成为老师</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">其他工作机会</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2018 Lighters, Inc.
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;