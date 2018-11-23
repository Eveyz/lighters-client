import React from 'react';

import { Link } from 'react-router-dom';

class MonthlyReport extends React.Component {
  back = () => {
    this.props.back("VIEW_TEACHER")
  }

  render() {
    let reportsList = this.props.reports.map((report, idx) => {
      return  <tr key={idx} className="action-hide">
                <td>{idx + 1}</td>
                <td>{report.course_id.name}</td>
                <td>{report.course_date}</td>
                <td>{report.student_id.lastname + report.student_id.firstname}</td>
                <td><Link to={`/reports/${report._id}`} target="_blank">查看报告</Link></td>
              </tr>
    })
    let reportsTable = <table className="highlight">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>课程名字</th>
                            <th>课程日期</th>
                            <th>学生名字</th>
                            <th>查看报告</th>
                          </tr>
                        </thead>

                        <tbody>
                          {reportsList}
                        </tbody>
                      </table>

    let sum = parseFloat(this.props.teacher.rate) * parseFloat(this.props.reports.length)
    return(
      <div>
        <button className="btn white black-text" onClick={this.back}>返回</button>
        <h6 className="airbnb-font bold">月总结</h6>
        <table className="highlight">
          <thead>
            <tr>
              <th>教师名字</th>
              <th>教师等级</th>
              <th>总课时</th>
              <th>工资每课时(元)</th>
              <th>月工资(元)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{this.props.teacher.name}</td>
              <td>{this.props.teacher.level}</td>
              <td>{this.props.reports.length}</td>
              <td>{this.props.teacher.rate}</td>
              <td>{sum}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <h6 className="airbnb-font bold">当月反馈表列表</h6>
        <h6 className="no-margin-bottom banner center">{this.props.month}</h6>
        {reportsTable}
        <br/>
      </div>
    )
  }
}

export default MonthlyReport;