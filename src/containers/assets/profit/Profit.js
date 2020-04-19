import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-materialize'
import axios from 'axios'

import PaginationTable from '../../PaginationTable'
import ProfitList from './ProfitList'
import CompensationList from './CompensationList'
import Loading from '../../../components/Loading'
import { getStudentReportCredit } from '../../../ultis'

const Profit = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [reports, setReports] = useState([])
  const [compensations, setCompensations] = useState([])

  useEffect(() => {
    async function fetData() {
      const reports_res = await axios.get(`/reports`)
      const compensations_res = await axios.get(`/compensations`)
      let _reports = reports_res.data
      let _compensations = compensations_res.data
      setReports(_reports)
      setCompensations(_compensations)
      setIsLoading(false)
    }
    fetData()
  }, [])

  if(isLoading) {
    return <Loading />
  }

  var sum = 0
  let reportContent = <div className="col m12">
                      <div className="card white r-box-shadow">
                        <div className="card-content">
                          <h4 className="center">当前没有反馈表</h4>
                        </div>
                      </div>
                    </div>
  if(reports.length > 0) {
    reports.forEach((report, idx) => {
      const report_credit = getStudentReportCredit(report.situation)
      if(report_credit > 0) {
        sum += (report.course_id.course_rate * report_credit - report.amount)
      }
    })
    reportContent = <PaginationTable rows={reports}>
                      <ProfitList />
                    </PaginationTable>
  }

  let compensationContent = <h4 className="center">当前没有补助或者罚款</h4>
  if(compensations.length > 0) {
    compensations.forEach((compensation, idx) => {
      if(compensation.type === "罚款") sum += compensation.amount
      else sum -= compensation.amount
    })
    compensationContent = <PaginationTable rows={compensations}>
                            <CompensationList />
                          </PaginationTable>
  }

  const clss = sum > 0 ? "green-text" : "red-text"

  return (
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

export default Profit

// class Profit extends React.Component {
  
//   componentWillMount() {
//     this.props.setLoadingStatus(true)
//     this.props.getAllReports()
//     this.props.getCompensations()
//   }

//   componentDidMount() {
//     this.props.setLoadingStatus(false)
//   }

//   render() {
//     if(this.props.isLoading) {
//       return <Loading />
//     }
//     // profit = 每个课程的单价 course.course_rate - 每张反馈表老师得到的钱 report.amout
//     var sum = 0
//     let reportContent = <div className="col m12">
//                         <div className="card white r-box-shadow">
//                           <div className="card-content">
//                             <h4 className="center">当前没有反馈表</h4>
//                           </div>
//                         </div>
//                       </div>
//     if(this.props.reports.length > 0) {
//       this.props.reports.forEach((report, idx) => {
//         const report_credit = getStudentReportCredit(report.situation)
//         if(report_credit > 0) {
//           sum += (report.course_id.course_rate * report_credit - report.amount)
//         }
//       })
//       reportContent = <PaginationContainer 
//                         itemsPerPage={20} 
//                         data={this.props.reports} 
//                         readOnly={false} 
//                       >
//                         <ProfitList />
//                       </PaginationContainer>
//     }

//     let compensationContent = <h4 className="center">当前没有补助或者罚款</h4>
//     if(this.props.compensations.length > 0) {
//       this.props.compensations.forEach((compensation, idx) => {
//         if(compensation.type === "罚款") sum += compensation.amount
//         else sum -= compensation.amount
//       })
//       compensationContent = <PaginationContainer 
//                               itemsPerPage={30} 
//                               data={this.props.compensations} 
//                               readOnly={false} 
//                             >
//                               <CompensationList />
//                             </PaginationContainer>
//     }

//     const clss = sum > 0 ? "green-text" : "red-text"

//     return(
//       <Row>
//         <Col m={12} s={12}>
//           <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
//             <h5 className="airbnb-font bold">当前盈利: <span className={clss}>{sum.toFixed(2)}</span>元</h5>
//             <hr/>
//             <br/>
//             {reportContent}
//             <br/>
//             {compensationContent}
//           </Card>
//         </Col>
//       </Row>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//     isLoading: state.status.loading,
//     reports: state.reportsData.reports,
//     compensations: state.compensationsData.compensations
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (isLoading) => {
//       dispatch(setLoadingStatus(isLoading))
//     },
//     getAllReports: () => {
//       dispatch(getAllReports())
//     },
//     getCompensations: () => {
//       dispatch(getCompensations())
//     }
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Profit);