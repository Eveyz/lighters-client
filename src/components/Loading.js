import React from 'react';
import Spinner from './../images/loading.svg';

const Loading = props => (
  <div className="container">
    <img className="center" src={Spinner} alt="loading..."></img>
  </div>
)

export default Loading;
