import React from "react";
import ReportRow from "./ReportRow";

import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-materialize';
import { selectStudent } from '../../actions/students_actions';
import { updateBooks } from '../../actions/select_book_actions';

class ReportList extends React.Component {
  constructor(props) {
    super(props)

    this.newReport = this.newReport.bind(this);
  }

  newReport = () => {
    let path = "/teachers/" + this.props.user_id + "/new_report";
    this.props.updateBooks([], [], []);
    this.props.setStudent(this.props.student, path);
  }

  render() {
    let reportList = this.props.reports.map((report, idx) => {
      return (
        <ReportRow 
          key={idx}
          idx={idx}
          report={report} 
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
    student: state.studentsData.currentStudent,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStudent: (student, path) => {
      dispatch(selectStudent(student, path))
    },
    updateBooks: (review_books, new_books, future_books) => {
      dispatch(updateBooks(review_books, new_books, future_books))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);