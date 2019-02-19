import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-materialize';

import { addStudent, deleteStudent, switchMode } from "../../actions/courses_actions";
import '../../css/App.css';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import StudentItem from './Student';
import Tag from '../../containers/Tag';

class CourseAddStudents extends React.Component {
  constructor(props) {
    super(props)

    this.name = React.createRef();

    this.switchMode = this.switchMode.bind(this);
    this.searchName = this.searchName.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  addStudent(studentID) {

  }

  switchMode() {
    let mode = this.props.search ? false : true;
    this.props.switchMode(mode);
  }

  searchName() {
    // let name = this.name.current.value;

  }
  
  render() {
    let teachers = this.props.course.teachers.map((teacher, index) => {
      return (
        <span key={index}>{teacher.lastname + teacher.firstname} </span>
      )
    });

    let students = <span>当前课程没有学生</span>;
    if(this.props.course.students.length > 0) {
      students = this.props.course.students.map((student, index) => {
        var studentName = student.lastname ? `${student.lastname + student.firstname} (${student.englishname})` : `${student.englishname}`;
        return (
          <Tag object={student} content={studentName} id={this.props.course._id} key={index} />
        )
      });
    }

    let allStudentsList = <span>当前没有可选择的学生</span>;
    if(this.props.students.length > 0 ) {
      let studentsList = this.props.students.map((student, idx) => {
        return (
          <StudentItem key={idx} student={student} />
        )
      });
      allStudentsList = <ul className="collection">{studentsList}</ul>
    }

    let widget = this.props.search ? 
      <div>
        <nav>
          <div className="nav-wrapper blue-grey">
            <form>
              <div className="input-field">
                <input 
                  id="search" 
                  type="search" 
                  required
                  onChange={this.searchName.bind(this)}
                  ref={this.name}
                />
                <label className="label-icon" htmlFor="search"><Icon>search</Icon></label>
                <Icon>close</Icon>
              </div>
            </form>
          </div>
        </nav>
      </div>
      : allStudentsList;

    return (
      <div>
        <Header />
        <div className="bg-light-grey page-min-height">
          <Breadcrumb action="addCourse"/>

          <div className="container">
            <br/>
            <div className="row">
              <div className="col m12">
                <h3>{this.props.course.name}</h3>
                <p>授课老师: {teachers}</p>
                <p>课程级别: {this.props.course.level}</p>
                <p>课程容量: {this.props.course.capacity}</p>
                <span>当前学生: {students}</span>
              </div>
            </div>
            
            <div className="row">
              <div className="col s12 m12">
                <div className="card">
                  <div className="card-content">

                    <div className="switch">
                      <label>
                        搜索
                        <input type="checkbox" onChange={this.switchMode.bind(this)} />
                        <span className="lever"></span>
                        浏览
                      </label>
                    </div>
                    <br/>
                    {widget}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    course: state.coursesData.currentCourse,
    search: state.coursesData.searchStudent,
    courses: state.coursesData.courses,
    students: state.studentsData.students
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    addStudent: () => dispatch(addStudent()),
    deleteStudent: () => dispatch(deleteStudent()),
    switchMode: (mode) => dispatch(switchMode(mode))
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseAddStudents);