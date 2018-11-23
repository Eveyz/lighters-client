import React from 'react'
import { connect } from 'react-redux'

import { setMode } from '../../actions/mode_action'

class MonthlyReportTable extends React.Component {
  constructor(props) {
    super(props)

    this.checkMonthlyReport = this.checkMonthlyReport.bind(this)
  }

  checkMonthlyReport() {
    this.props.setMode("VIEW_MONTHLY")
    this.props.viewMonthReports(this.props.month, this.props.reports)
  }

  render() {
    return(
      <tr className="clickable" onClick={this.checkMonthlyReport}>
        <td>{this.props.month}</td>
        <td>{this.props.reports.length}</td>
        <td className="green-text">已付</td>
      </tr>
    )
  }
}

const mapStateToProps = state => {
  return {
    
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setMode: (mode) => {
      dispatch(setMode(mode))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyReportTable)