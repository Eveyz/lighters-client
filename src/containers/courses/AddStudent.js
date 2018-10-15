import React from 'react';
import { connect } from 'react-redux';

import { addStudent, deleteStudent, selectCourse } from "../../actions/courses_actions";
import '../../css/App.css';
import CourseForm from './CourseForm';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import { stat } from 'fs';

class AddStudent extends React.Component {
  
  render() {
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
                <p>授课老师: {this.props.course.name}</p>
                <p>课程级别: {this.props.course.level}</p>
                <p>课程容量: {this.props.course.capacity}</p>
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
    courses: state.coursesData.courses
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    addStudent: () => dispatch(addStudent()),
    deleteStudent: () => dispatch(deleteStudent())
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);