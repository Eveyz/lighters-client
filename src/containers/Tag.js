import React from 'react';
import { connect } from 'react-redux';

import { deleteStudent } from '../actions/courses_actions';

class Tag extends React.Component {
  constructor(props) {
    super(props)

    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.remove(this.props.id, this.props.object._id);
  }

  render() {
    return (
      <div className="chip">
        {this.props.content}
        <span onClick={this.remove.bind(this)} style={{cursor: "pointer", color: "#e74c3c"}}> &#10005;</span>
      </div>
    )
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    remove: (id, studentID) => dispatch(deleteStudent(id, studentID))
  }
}

export default connect(null, mapDispatchtoProps)(Tag);