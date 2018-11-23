import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MonthlyReport from './MongthlyReport';
import { sortandGroupReports } from '../../ultis';
import MonthlyReportList from './MonthlyReportList';

class TeacherSalaryDetail extends React.Component {
  back = () => {
    this.props.back("BROWSE")
  }

  viewMonthReports = (month, reports) => {
    this.props.viewMonthReports(month, reports)
  }

  render() {
    let reportsContent = <h6 className="airbnb-font center">教师没有课后反馈表</h6>
    let _reports = this.props.reports  //  { "2018-11": [...], "2018-12": [...], ... }
    if( !_.isEmpty(_reports)) {
      let monthlyReportList = Object.keys(_reports).map((month, idx) => {
        return <MonthlyReportList 
                  key={idx} 
                  month={month} 
                  reports={_reports[month]}
                  viewMonthReports={this.viewMonthReports}
                />
      });
      
      reportsContent = <table className="highlight">
                          <thead>
                            <tr>
                              <th>月份</th>
                              <th>反馈表数量</th>
                              <th>状态</th>
                            </tr>
                          </thead>

                          <tbody>
                            {monthlyReportList}
                          </tbody>
                        </table>
    }

    return(
      <div>
        <button className="btn white black-text" onClick={this.back}>返回</button>
        <h6 className="airbnb-font bold cyan-text">教师信息</h6>
        <table className="highlight">
          <thead>
            <tr>
              <th>教师姓名</th>
              <th>教师等级</th>
              <th>工资每课时/元</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{this.props.teacher.name}</td>
              <td>{this.props.teacher.level}级</td>
              <td>{this.props.teacher.rate}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <h6 className="airbnb-font bold cyan-text">教师课时</h6>
        {reportsContent}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reports: sortandGroupReports(state.reportsData.reports)
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSalaryDetail);