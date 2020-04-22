import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import { deleteCourse, addStudent, addBook, editCourse, updateCourse } from '../../actions/courses_actions';
import { Modal } from 'react-materialize';
import ThemeList from './ThemeList';

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.activateCourse = this.activateCourse.bind(this);
    this.deactivateCourse = this.deactivateCourse.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addBook = this.addBook.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
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

  selectTheme(theme) {
    this.props.updateCourse(this.props.id, {theme: theme});
    var elem = document.querySelector(`#modal-${this.props.id}`)
    var instance = M.Modal.getInstance(elem)
    instance.close()
  }

  activateCourse() {
    // let field = this.props.course.status === "active" ? {status: "inactive"} : {status: "active"};
    this.props.updateCourse(this.props.id, {status: "active"});
  }

  deactivateCourse() {
    this.props.updateCourse(this.props.id, {status: "inactive"});
  }

  render() {
    var nameList = this.props.course.teachers.map((teacher, index) => {
      return (
        <span key={index}>{teacher.lastname + teacher.firstname}</span>
      )
    });

    const modal = <Modal
                    header='选择课程主题'
                    id={`modal-${this.props.id}`}
                    className="theme-modal"
                    trigger={<a href="">选择主题</a>}>
                    <ThemeList selectTheme={this.selectTheme} />
                  </Modal>

    let statusBtn = this.props.course.status === "active" ? <a href="" onClick={() => { if (window.confirm('确认要关闭课程嘛?')) this.deactivateCourse() }}>关闭</a> : <a href="" onClick={() => { if (window.confirm('确认要激活课程嘛?')) this.activateCourse() }}>激活</a>

    const image = this.props.course.theme ? this.props.course.theme : "WorldStudies-title.jpg"

    return(
      <div className="col s12 m3">
        <div className="card r-box-shadow">
          <div className="card-image">
            <img src={require(`../../images/classroom/${image}`)} alt="course_background" />
          </div>
          <div className="card-content">
            <h6 className="text-overflow" style={{fontWeight: "400", marginTop: "0px"}}><b>{ this.props.course.name }</b></h6>
            <p>授课老师: {nameList}</p>
            <p>课程级别: { this.props.course.level }</p>
            <p>课程类型: { this.props.course.type }</p>
            <p>课时费(元/课时/学生): { this.props.course.course_rate ? this.props.course.course_rate : 0 }元</p>
            <p>学生数量: { this.props.course.students.length }</p>
            <p>绘本数量: { this.props.course.books.length }</p>
          </div>
          <div className="card-action">
            <a onClick={this.editCourse} href="">编辑课程</a>
            <a onClick={this.addStudent} href="">添加学生</a>
            <a onClick={this.addBook} href="">添加绘本</a>
            {modal}
            {statusBtn}
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
