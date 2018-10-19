import React from 'react';
import { connect } from 'react-redux';
import '../../css/App.css';
import { deleteCourse, addStudent, addBook, editCourse } from '../../actions/courses_actions';


class Student extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  editCourse() {
    this.props.editCourse(this.props.course);
  }

  addStudent() {
    this.props.addStudent(this.props.course);
  }

  addBook() {
    this.props.addBook(this.props.course);
  }

  deleteCourse() {
    this.props.deleteCourse(this.props.id);
  }

  render() {
    return(
      <tr>
        <td>{this.props.student.lastname}</td>
        <td>{this.props.student.firstname}</td>
        <td>{this.props.student.age}</td>
        <td>{this.props.student.birthday}</td>
        <td>{this.props.student.gender}</td>
        <td><a>查看</a></td>
        <td><a>编辑</a></td>
        <td><a>注销</a></td>
      </tr>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
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
    }
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
