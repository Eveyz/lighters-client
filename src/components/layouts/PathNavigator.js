import React from 'react';
import { Link } from 'react-router-dom';

const PathNavigator = props => (
  <div style={{backgroundColor: "#ffca28", padding: "10px 0px 13px 0px"}}>
    <div className="container">
      <div className="row no-margin">
        <div className="col s12">
          <h5 className="white-text" style={{fontWeight: "500"}}> <Link to={props.path} style={{color: "white"}}>返回</Link> <span style={{color: "#eeeeee"}}> > { props.content }</span></h5>
        </div>
      </div>
    </div>
  </div>
)

export default PathNavigator;