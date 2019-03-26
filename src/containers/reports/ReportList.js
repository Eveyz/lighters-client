import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-materialize';

import ReportRow from "./ReportRow";
import Loading from '../../components/Loading';

import { setLoadingStatus } from '../../actions/status_actions';
import { selectStudent } from '../../actions/students_actions';
// import { updateBooks } from '../../actions/select_book_actions';
import { getTeacherCourses } from '../../actions/teachers_actions';
import { getReports } from '../../actions/reports_actions';

class ReportList extends React.Component {
  constructor(props) {
    super(props)

    this.newReport = this.newReport.bind(this);
  }

  componentWillMount() {
    this.props.setLoadingStatus(true)
  }

  componentDidMount() {
    this.props.getReports(this.props.course_id, this.props.student._id, this.props.teacher_id)
  }

  newReport = () => {
    // let path = "/teachers/" + this.props.user_id + "/new_report";
    // this.props.updateBooks([], [], [])
    // this.props.setStudent(this.props.student, path)
    this.props.getTeacherCourses(this.props.identity._id)
  }

  render() {
    if(this.props.isLoading) {
      return <Loading />
    }

    let reportList = this.props.reports.map((report, idx) => {
      return (
        <ReportRow 
          key={idx}
          idx={idx}
          report={report}
          courses={this.props.courses}
        />
      );
    });

    let renderContent = this.props.reports.length > 0 ? 
                        <table>
                          <thead>
                            <tr>
                              <th>课程回馈表</th>
                              <th>上课时间</th>
                              <th>学生英文名</th>
                              <th>学生年龄</th>
                              <th>课程</th>
                              <th colSpan="2"></th>
                            </tr>
                          </thead>

                          <tbody>
                            {reportList}
                          </tbody>
                        </table>
                        :
                        <div>
                          <button onClick={this.newReport} className="btn">填写新课程回馈表</button>
                          <br/>
                          <Row>
                            <Col m={12} s={12}>
                              <Card className='white r-box-shadow' textClassName='black-text' title=''>
                              <h5 className="center">当前没有课程回馈表</h5>
                              </Card>
                            </Col>
                          </Row>
                        </div>;

    return (
      <div className="row page-min-height">
        <div className="col m12">
          {renderContent}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    identity: state.auth.identityData,
    isLoading: state.status.loading,
    course_id: state.coursesData.currentCourse._id,
    teacher_id: state.auth.identityData._id,
    student: state.studentsData.currentStudent,
    reports: state.reportsData.reports,
    courses: state.coursesData.courses.map(course => ({
        id: course._id,
        name: course.name
      })
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoadingStatus: (status) => {
      dispatch(setLoadingStatus(status))
    },
    getReports: (course_id, student_id, teacher_id) => {
      dispatch(getReports(course_id, student_id, teacher_id))
    },
    getTeacherCourses: (teacher_id) => {
      dispatch(getTeacherCourses(teacher_id))
    },
    setStudent: (student, path) => {
      dispatch(selectStudent(student, path))
    },
    // updateBooks: (review_books, new_books, future_books) => {
    //   dispatch(updateBooks(review_books, new_books, future_books))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);