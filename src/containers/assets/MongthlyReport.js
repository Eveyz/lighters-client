import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Compensation from './Compensation';
import { sortReportsByDate } from '../../ultis';
import { updatePaycheck } from '../../actions/paychecks_actions';

class MonthlyReport extends React.Component {
  constructor(props) {
    super(props)

    this.sum = 0
  }

  back = () => {
    this.props.back("VIEW_TEACHER")
  }

  pay = (id, field) => {
    this.props.pay(this.props.paycheck._id, {paid: true, amount: this.sum})
  }

  render() {
    let reportsList = sortReportsByDate(this.props.paycheck.reports).map((report, idx) => {
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

    let base = (parseFloat(this.props.teacher.rate) * this.props.paycheck.reports.length)
    let btn = this.props.paycheck.paid ? <button disabled className="btn btn-large red">已结算</button> : <button className="btn btn-large" onClick={() => { if (window.confirm('确认要进行结算? 结算之后将无法更改, 请核查准确')) this.pay() }}>结算</button>

    this.sum = base
    if(this.props.compensations.length > 0) {
      this.props.compensations.forEach((c, idx) => {
        let _amount = parseFloat(c.amount, 10)
        c.type !== "罚款" ? this.sum += _amount : this.sum -= _amount
      })
    }

    return(
      <div>
        <button className="btn white black-text" onClick={this.back}>返回</button>
        <h6 className="airbnb-font bold">基本工资</h6>
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
              <td>{this.props.teacher.level}级</td>
              <td>{this.props.paycheck.reports.length}</td>
              <td>{this.props.teacher.rate}</td>
              <td>{base}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <h6 className="airbnb-font bold">奖励, 津贴或罚款</h6>
        <Compensation paid={this.props.paycheck.paid} paycheck_id={this.props.paycheck._id} />
        <br/>
        <h5 className="airbnb-font bold">月总结: {this.sum.toFixed(2)}元</h5>
        <br/>
        {btn}
        <br/>
        <hr/>
        <br/>
        <h6 className="airbnb-font bold">当月反馈表列表</h6>
        <h6 className="no-margin-bottom banner center">{this.props.paycheck.month}</h6>
        {reportsTable}
        <br/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    compensations: state.compensationsData.compensations,
    paycheck: state.paycheckData.paycheck
  };
}

const mapDispatchToProps = dispatch => {
  return {
    pay: (id, field) => {
      dispatch(updatePaycheck(id, field))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyReport)