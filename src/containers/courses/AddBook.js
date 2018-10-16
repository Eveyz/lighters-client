import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-materialize';

import { addStudent, deleteStudent, switchMode } from "../../actions/courses_actions";
import '../../css/App.css';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import BookTable from '../../components/books/bookTable';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import SelectBookWidget from '../../containers/books/SelectBookWidget';

class CourseAddBook extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let teachers = this.props.course.teachers.map((teacher, index) => {
      return (
        <span key={index}>{teacher.lastname + teacher.firstname} </span>
      )
    });

    let curbooksTable = this.props.assignedBooks.length > 0 ? 
                        <BookTable books={this.props.assignedBooks} type="DELETE" /> : 
                        <h6>目前还没有分配对应的绘本, 请从下面的书单中添加对应的绘本</h6>;

    let selectBookWidget = this.props.books.length > 0 ?
                        <SelectBookWidget /> : 
                        <h6 className="center">无法获取绘本资源，请确认已导入或者输入绘本资源</h6>;

    return (
      <div>
        <Header />
        <div className="bg-light-grey page-min-height">
          <Breadcrumb action="addBooks"/>

          <div className="container">

            <div className="row">
              <div className="col s12 m12">
                <h3>{this.props.course.name}</h3>
                <p>授课老师: {teachers}</p>
                <p>课程级别: {this.props.course.level}</p>
                <p>课程容量: {this.props.course.capacity}</p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m12">
                <div className="card">
                  <div className="card-content">
                    <h5 className="blue-text">学生专属书单</h5>
                    {curbooksTable}
                    <br/>
                    <h5 className="green-text">所有绘本书单</h5>
                    {selectBookWidget}
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
    assignedBooks: state.coursesData.currentCourse.books,
    students: state.studentsData.students,
    books: state.booksData.books
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseAddBook);