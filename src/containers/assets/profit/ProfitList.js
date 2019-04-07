import React from 'react';

import { getStudentReportCredit, getLocalTime } from '../../../ultis'

class ProfitList extends React.Component {
  render() {
    let profitList = []
    let profitTable = <div className="col m12">
                        <div className="card white r-box-shadow">
                          <div className="card-content">
                            <h4 className="center">当前没有反馈表</h4>
                          </div>
                        </div>
                      </div>
    if(this.props.data.length > 0) {
      this.props.data.forEach((report, idx) => {
        const report_credit = getStudentReportCredit(report.situation)
        if(report_credit > 0) {
          const profit = report.course_id.course_rate * report_credit - report.amount
          const cls = profit > 0 ? "green-text" : "red-text"
          profitList.push(<tr key={idx}>
                            <td>{report.course_id.name}</td>
                            <td>{getLocalTime(report.updated_at)}</td>
                            <td>{report.teacher_id.englishname}</td>
                            <td>{report.student_id.englishname}</td>
                            <td className={cls}>{profit.toFixed(2)}</td>
                          </tr>)
        }
      })
      // profitList = _profit.map((report, idx) => {
      //   const profit = report.course_id.course_rate - report.amount
      //   const cls = profit > 0 ? "green-text" : "red-text"
      //   return <tr key={idx}>
      //             <td>{report.course_id.name}</td>
      //             <td>{report.updated_at}</td>
      //             <td>{report.teacher_id.englishname}</td>
      //             <td>{report.student_id.englishname}</td>
      //             <td className={cls}>{profit}</td>
      //          </tr>
      // })
      profitTable = <table className="highlight">
                        <thead>
                          <tr>
                            <th>课程</th>
                            <th>课程时间</th>
                            <th>教师</th>
                            <th>学生</th>
                            <th>盈利(元)</th>
                          </tr>
                        </thead>

                        <tbody>
                          {profitList}
                        </tbody>
                      </table>
    }
    

    return (
      <div>
        <h6 className="airbnb-font bold">所有反馈表</h6>
        <hr/>
        {profitTable}
      </div>
    )
  }
}

export default ProfitList;