import React from "react";
import { connect } from 'react-redux';

import { editReport, deleteReport } from '../../actions/reports_actions';

class ReportRow extends React.Component {

  constructor(props) {
    super(props)

    this.deleteReport = this.deleteReport.bind(this);
  }

  deleteReport = () => {
    this.props.deleteReport(this.props.report._id);
  }

  editReport = () => {
    let path = "/teachers/" + this.props.user_id + "/edit_report";
    this.props.editReport(this.props.report, path);
  }

  render() {
    return (
      <tr>
        <td>第{ this.props.idx + 1 }次</td>
        <td>{ this.props.report.course_date }</td>
        <td>{ this.props.student.englishname }</td>
        <td>{ this.props.student.age }</td>
        <td>{ this.props.course_name }</td>
        <td><button className="btn" onClick={this.editReport}>编辑课程回馈表</button></td>
        <td><button className="btn red" onClick={this.deleteReport}>删除</button></td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    student: state.studentsData.currentStudent,
    course_name: state.coursesData.currentCourse.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReport: (report_id) => dispatch(deleteReport(report_id)),
    editReport: (report, path) => dispatch(editReport(report, path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportRow);