import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../css/App.css';
import { deleteCourse } from '../../actions/courses_actions';

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this);
  }

  deleteCourse() {
    this.props.deleteCourse(this.props.id);
  }

  render() {
    var nameList = this.props.course.teachers.map((teacher, index) => {
      return (
        <span key={index}>{teacher.lastname + teacher.firstname}</span>
      )
    });

    return(
      <div className="row">
        <div className="col s12 m12">
          <div className="card r-box-shadow">
            <div className="card-content">
              <span className="card-title cyan-text" style={{fontWeight: "400"}}><b>{ this.props.course.name }</b></span>
              <p>授课老师: {nameList}</p>
              <p>课程级别: { this.props.course.level }</p>
              <p>学生数量: { this.props.course.capacity }</p>
              <p>绘本数量: { this.props.course.books.length }</p>
            </div>
            <div className="card-action">
              <a>编辑课程</a>
              <Link to={"courses/" + this.props.id + "/add_student"}>添加学生</Link>
              <Link to="courses/:_id/add_book">添加绘本</Link>
              <a onClick={this.deleteCourse} href="javascript:;">删除</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    teachers: state.rootReducer.teachers,
    students: state.rootReducer.students
  };
}

const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    deleteCourse: (courseID) => {
      dispatch(deleteCourse(courseID))
    }
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
