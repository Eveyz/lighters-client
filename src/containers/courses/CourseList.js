import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-materialize';
import { Link } from 'react-router-dom';

import { getCourses, addCourse, deleteCourse } from "../../actions/courses_actions";
import '../../css/App.css';
import Course from './Course';
import CourseForm from './CourseForm';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';

class CourseList extends React.Component {

  render() {
    let courseList;
    if(this.props.courses.length > 0) {
      courseList = this.props.courses.map((course, index) => {
        return (
          <Course key={index} id={course._id} course={course} />
        );
      });
    } else {
      courseList = <h4>当前没有课程，请添加</h4>;
    }

    return (
      <div>
        <Header />
        <div className="bg-light-grey page-min-height">
          <Breadcrumb action="courses"/>

          <div className="container">
            <br/>
            <div className="row">
              <div className="col m12">
                <Link to="/courses/add_course" className="btn">添加课程</Link>
              </div>
            </div>

            <div className="row">
              <div className="col m3">
                <h6 style={{color: "rgba(0,0,0,.6)", fontWeight: "700"}}>所有课程</h6>
              </div>
            </div>

            <div className="row">
              <div className="col m12">
                {courseList}
              </div>
            </div>
            <br/>

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
    courses: state.coursesData.courses
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    fetchCoures: () => {
      dispatch(getCourses())
    },
    addCourse: () => dispatch(addCourse()),
    deleteCourse: () => dispatch(deleteCourse())
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);