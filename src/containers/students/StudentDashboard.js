import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tui-calendar/dist/tui-calendar.min.css';

import Header from '../../components/layouts/Header';
import TuiCalendar from '../TuiCalendar';
import StudentCourseList from './StudentCourseList';
import StudentBookList from './StudentBookList';
import StudentAsset from './StudentAsset';
import { getStudentReports } from '../../actions/students_actions';

class StudentDashboard extends React.Component {
  componentDidMount = () => {
    this.props.getStudentReports(this.props.student._id);
  }

  render() {
    let height = {};
    let mainContent = <div className="card white r-box-shadow">
                        <div className="card-content">
                          <TuiCalendar isReadOnly={true} />
                        </div>
                      </div>;
    
    if(this.props.location.pathname.includes("dashboard")) {
      mainContent = <StudentCourseList 
                      courses={this.props.student.courses} 
                      student_id={this.props.student._id}
                      reports={this.props.reports} 
                    />;
    } else if (this.props.location.pathname.includes("assets")) {
      mainContent = <StudentAsset student_id={this.props.student._id} />
    } else if (this.props.location.pathname.includes("books")) {
      let _books = [];
      this.props.student.courses.forEach(course => {
        _books = _books.concat(course.books);
      });
      mainContent = <StudentBookList books={_books} />
    } else {
      height = {"minHeight": "750px"};
    }

    return(
      <div>
        <Header />
        <div className="student-dashboard" style={height}>
          <div className="left-fixed-bar">
            <br/>
            <h5 className="cyan-text" style={{marginLeft: "30px"}}>我的教室</h5>
            <div className="left-bar-menu">
              <Link to={`/students/${this.props.student._id}/dashboard`} className={this.props.location.pathname.includes("dashboard") ? "active" : ""}>
                <i className="material-icons">event_note</i><span>课程</span>
              </Link>
              <Link to={`/students/${this.props.student._id}/assets`} className={this.props.location.pathname.includes("assets") ? "active" : ""}>
                <i className="material-icons">description</i><span>学费记录</span>
              </Link>
              <Link to={`/students/${this.props.student._id}/schedule`} className={this.props.location.pathname.includes("schedule") ? "active" : ""}>
                <i className="material-icons">schedule</i><span>课程表</span>
              </Link>
              <Link to={`/students/${this.props.student._id}/books`} className={this.props.location.pathname.includes("books") ? "active" : ""}>
                <i className="material-icons">book</i><span>绘本</span>
              </Link>
            </div>
          </div>
          <div className="main-content-wrapper">
            <br/>
            <div className="main-content">
              {mainContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    student: state.auth.identityData,
    reports: state.studentsData.reports,
    loading: state.reportsData.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentReports: (student_id) => {
      dispatch(getStudentReports(student_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);