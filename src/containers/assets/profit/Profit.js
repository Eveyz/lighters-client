import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';

import { getAllReports } from '../../../actions/reports_actions'
import { getCompensations } from '../../../actions/compensations_actions'
import { setLoadingStatus } from '../../../actions/status_actions';

import PaginationContainer from '../../PaginationContainer'
import ProfitList from './ProfitList'
import CompensationList from './CompensationList'
import Loading from '../../../components/Loading';
import { getStudentReportCredit } from '../../../ultis'

class Profit extends React.Component {
  
  componentWillMount() {
    this.props.setLoadingStatus(true)
    this.props.getAllReports()
    this.props.getCompensations()
  }

  componentDidMount() {
    this.props.setLoadingStatus(false)
  }

  render() {
    if(this.props.isLoading) {
      return <Loading />
    }
    // profit = 每个课程的单价 course.course_rate - 每张反馈表老师得到的钱 report.amout
    var sum = 0
    let reportContent = <div className="col m12">
                        <div className="card white r-box-shadow">
                          <div className="card-content">
                            <h4 className="center">当前没有反馈表</h4>
                          </div>
                        </div>
                      </div>
    if(this.props.reports.length > 0) {
      this.props.reports.forEach((report, idx) => {
        const report_credit = getStudentReportCredit(report.situation)
        if(report_credit > 0) {
          sum += (report.course_id.course_rate * report_credit - report.amount)
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

    let compensationContent = <h4 className="center">当前没有补助或者罚款</h4>
    if(this.props.compensations.length > 0) {
      this.props.compensations.forEach((compensation, idx) => {
        if(compensation.type === "罚款") sum += compensation.amount
        else sum -= compensation.amount
      })
      compensationContent = <PaginationContainer 
                              itemsPerPage={20} 
                              data={this.props.compensations} 
                              readOnly={false} 
                            >
                              <CompensationList />
                            </PaginationContainer>
    }

    const clss = sum > 0 ? "green-text" : "red-text"

    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
            <h5 className="airbnb-font bold">当前盈利: <span className={clss}>{sum.toFixed(2)}</span>元</h5>
            <hr/>
            <br/>
            {reportContent}
            <br/>
            {compensationContent}
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    isLoading: state.status.loading,
    reports: state.reportsData.reports,
    compensations: state.compensationsData.compensations
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoadingStatus: (isLoading) => {
      dispatch(setLoadingStatus(isLoading))
    },
    getAllReports: () => {
      dispatch(getAllReports())
    },
    getCompensations: () => {
      dispatch(getCompensations())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profit);