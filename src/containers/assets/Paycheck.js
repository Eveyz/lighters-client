import React from 'react'
import { connect } from 'react-redux'

import { setMode } from '../../actions/mode_action'
import { selectPaycheck } from '../../actions/paychecks_actions';

class Paycheck extends React.Component {
  constructor(props) {
    super(props)

    this.checkPaycheck = this.checkPaycheck.bind(this)
  }

  checkPaycheck() {
    this.props.setMode("VIEW_MONTHLY")
    this.props.selectPaycheck(this.props.paycheck)
    this.props.viewPaycheck(this.props.paycheck)
  }

  render() {
    let paid = this.props.paycheck.paid ? <td className="airbnb-font bold green-text">已结算</td> : <td className="airbnb-font bold red-text">未结算</td>
    return(
      <tr className="clickable" onClick={this.checkPaycheck}>
        <td>{this.props.paycheck.month}</td>
        <td>{this.props.paycheck.teacher_id.lastname + this.props.paycheck.teacher_id.firstname}</td>
        <td>{this.props.paycheck.reports.length}</td>
        {paid}
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
    },
    selectPaycheck: (paycheck) => {
      dispatch(selectPaycheck(paycheck))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paycheck)