import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/layouts/Header';
import TuiCalendar from '../TuiCalendar';
import StudentCourseList from './StudentCourseList';

class StudentDashboard extends React.Component {
  render() {
    console.log(this.props);
    let mainContent = <div className="card white r-box-shadow">
                        <div className="card-content">
                          <TuiCalendar />
                        </div>
                      </div>;
    
    if(this.props.location.pathname.includes("courses")) {
      mainContent = <StudentCourseList courses={this.props.student.courses} />;
    } else if (this.props.location.pathname.includes("reports")) {

    } else if (this.props.location.pathname.includes("books")) {

    }

    return(
      <div>
        <Header />
        <div className="student-dashboard">
          <div className="left-fixed-bar">
            <br/>
            <h5 className="cyan-text" style={{marginLeft: "30px"}}>学生Dashboard</h5>
            <div className="left-bar-menu">
              <Link to={`/students/${this.props.student._id}/dashboard`} className={this.props.location.pathname.includes("dashboard") ? "active" : ""}>
                <i className="material-icons">home</i><span>主页</span>
              </Link>
              <Link to={`/students/${this.props.student._id}/courses`} className={this.props.location.pathname.includes("courses") ? "active" : ""}>
                <i className="material-icons">event_note</i><span>课程</span>
              </Link>
              <Link to={`/students/${this.props.student._id}/reports`} className={this.props.location.pathname.includes("reports") ? "active" : ""}>
                <i className="material-icons">description</i><span>课程回馈表</span>
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
    student: state.auth.identityData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);