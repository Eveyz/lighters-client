import React from 'react';
import {connect} from 'react-redux';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import PathNavigator from '../../components/layouts/PathNavigator';
import ReportList from './ReportList';
import { getReports } from '../../actions/reports_actions';

class AllReports extends React.Component {
  componentWillMount() {
    this.props.fetchAllReports(this.props.course_id, this.props.student._id, this.props.teacher_id);
  }

  render() {
    return(
      <div>
        <Header />
        <PathNavigator 
          path={"/teachers/" + this.props.user_id + "/course_manager"} 
          content={"所有课程反馈表"} 
        />
        <div className="container">
          <br />
          <div className="row">
            <div className="col m12">
              <h5><b>学生: {this.props.student.lastname + this.props.student.firstname}</b></h5>
            </div>
          </div>

          <ReportList reports={this.props.reports} />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    course_id: state.coursesData.currentCourse._id,
    teacher_id: state.auth.identityData._id,
    student: state.studentsData.currentStudent,
    reports: state.reportsData.reports
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllReports: (course_id, student_id, teacher_id) => dispatch(getReports(course_id, student_id, teacher_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllReports);