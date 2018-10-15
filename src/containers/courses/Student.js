import React from 'react';
import { connect } from 'react-redux';

import { postStudent } from '../../actions/courses_actions';

class StudentItem extends React.Component {
  constructor(props) {
    super(props)

    this.addStudent = this.addStudent.bind(this);
  }

  addStudent() {
    let studentID = this.props.student._id;
    let courseID = this.props.course._id;
    this.props.addStudent(courseID, {"studentID": studentID});
  }

  render() {
    return(
      <a href="javascript:;" onClick={this.addStudent} className="collection-item">{this.props.student.lastname + this.props.student.firstname}</a>
    )
  }
};

const mapStatetoProps = (state) => {
  return {
    course: state.coursesData.currentCourse
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    addStudent: (courseID, studentID) => dispatch(postStudent(courseID, studentID))
  }
};

export default connect(mapStatetoProps, mapDispatchtoProps)(StudentItem);