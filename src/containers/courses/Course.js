import React from 'react';
import { connect } from 'react-redux';
import '../../css/App.css';
import { deleteCourse, addStudent, addBook, editCourse, updateCourse } from '../../actions/courses_actions';


class Course extends React.Component {
  constructor(props) {
    super(props);

    this.updateCourse = this.updateCourse.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  editCourse(e) {
    e.preventDefault();
    this.props.editCourse(this.props.course);
  }

  addStudent(e) {
    e.preventDefault();
    this.props.addStudent(this.props.course);
  }

  addBook(e) {
    e.preventDefault();
    this.props.addBook(this.props.course);
  }

  updateCourse(e) {
    e.preventDefault();
    let field = this.props.course.status === "active" ? {status: "inactive"} : {status: "active"};
    this.props.updateCourse(this.props.id, field);
  }

  render() {
    var nameList = this.props.course.teachers.map((teacher, index) => {
      return (
        <span key={index}>{teacher.lastname + teacher.firstname}</span>
      )
    });

    return(
      <div className="col s12 m6">
        <div className="card r-box-shadow">
          <div className="card-content">
            <span className="card-title cyan-text" style={{fontWeight: "400"}}><b>{ this.props.course.name }</b></span>
            <p>授课老师: {nameList}</p>
            <p>课程级别: { this.props.course.level }</p>
            <p>学生数量: { this.props.course.students.length }</p>
            <p>绘本数量: { this.props.course.books.length }</p>
          </div>
          <div className="card-action">
            <a onClick={this.editCourse} href="">编辑课程</a>
            <a onClick={this.addStudent} href="">添加学生</a>
            <a onClick={this.addBook} href="">添加绘本</a>
            <a onClick={this.updateCourse} href="">关闭</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    identity: state.auth.user.userTokenData.identity,
    teachers: state.teachersData.teachers,
    students: state.studentsData.students
  };
}

const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    deleteCourse: (courseID) => {
      dispatch(deleteCourse(courseID))
    },
    addStudent: (courseID) => {
      dispatch(addStudent(courseID))
    },
    addBook: (courseID) => {
      dispatch(addBook(courseID))
    },
    editCourse: (course) => {
      dispatch(editCourse(course))
    },
    updateCourse: (id, field) => {
      dispatch(updateCourse(id, field))
    }
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
