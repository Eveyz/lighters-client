import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCourses, addCourse, deleteCourse } from "../../actions/courses_actions";
import { setLoadingStatus } from "../../actions/status_actions";
import { getBooks } from '../../actions/books_actions';
import '../../css/App.css';
import Course from './Course';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';

class CourseList extends React.Component {

  componentWillMount() {
    this.props.setLoadingStatus(true);
    this.props.fetchCoures()
    this.props.getBooks()
  }

  render() {
    let courseList;
    if(this.props.courses.length > 0) {
      courseList = this.props.courses.map((course, index) => {
        return (
          <Course key={index} id={course._id} course={course} />
        );
      });
    } else {
      courseList =  <div className="col m12">
                      <div className="card white r-box-shadow">
                        <div className="card-content">
                          <h4 className="center">当前没有课程，请添加</h4>;
                        </div>
                      </div>
                    </div>;
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

            <br/>
            <div className="row">
              <div className="col m3">
                <h6 style={{color: "rgba(0,0,0,.6)", fontWeight: "700"}}>所有课程</h6>
              </div>
            </div>

            <div className="row">
              {courseList}
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

const mapDispatchToProps = dispatch => {
  return {
    setLoadingStatus: (status) => {
      dispatch(setLoadingStatus(status))
    },
    getBooks: () => dispatch(getBooks()),
    fetchCoures: () => {
      dispatch(getCourses())
    },
    addCourse: () => dispatch(addCourse()),
    deleteCourse: () => dispatch(deleteCourse())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);