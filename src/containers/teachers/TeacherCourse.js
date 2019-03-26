import React from 'react';
import { connect } from 'react-redux';

import { selectCourse } from '../../actions/courses_actions';

class TeacherCourse extends React.Component {
  constructor(props) {
    super(props)

    this.clickCourse = this.clickCourse.bind(this)
  }

  clickCourse = (e) => {
    e.preventDefault();
    let path = "/teachers/" + this.props.user_id + "/course_manager";
    this.props.selectCourse(this.props.course, path);
  }

  render() {
    return(
      <a href="" onClick={this.clickCourse}>
        <div className="col s12 m6">
          <div className="card r-box-shadow">
            <div className="card-content">
              <span className="card-title cyan-text text-overflow" style={{fontWeight: "400"}}><b>{ this.props.course.name }</b></span>
              <p className="black-text">课程级别: { this.props.course.level }</p>
              <p className="black-text">学生数量: { this.props.course.students.length }</p>
              <p className="black-text">绘本数量: { this.props.course.books.length }</p>
            </div>
          </div>
        </div>
      </a>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCourse: (course, path) => {
      dispatch(selectCourse(course, path))
    }
  }
}

export default connect(null, mapDispatchToProps)(TeacherCourse);