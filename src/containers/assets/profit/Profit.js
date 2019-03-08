import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';

import { getAllReports } from '../../../actions/reports_actions'
import PaginationContainer from '../../PaginationContainer'
import ProfitList from './ProfitList'

import { getReportCredit } from '../../../ultis'

class Profit extends React.Component {
  
  componentWillMount() {
    this.props.getAllReports()
  }

  render() {
    // profit = 每个课程的单价 course.course_rate - 每张反馈表老师得到的钱 report.amout
    let reportContent = <div className="col m12">
                        <div className="card white r-box-shadow">
                          <div className="card-content">
                            <h4 className="center">当前没有反馈表</h4>
                          </div>
                        </div>
                      </div>
    var sum = 0
    if(this.props.reports.length > 0) {
      this.props.reports.forEach((report, idx) => {
        const report_credit = getReportCredit(report.situation)
        if(report_credit > 0) {
          sum += (report.course_id.course_rate - report.amount)
        }
      })
      reportContent = <PaginationContainer 
                        itemsPerPage={20} 
                        data={this.props.reports} 
                        readOnly={false} 
                      >
                        <ProfitList />
                      </PaginationContainer>
    }
    const clss = sum > 0 ? "green-text" : "red-text"

    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
            <h5 className="airbnb-font bold">当前盈利: <span className={clss}>{sum.toFixed(2)}</span>元</h5>
            <hr/>
            {reportContent}
            <br/>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    reports: state.reportsData.reports
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllReports: () => {
      dispatch(getAllReports())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profit);