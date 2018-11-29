import React from 'react'
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-materialize';

import { getPaychecks } from '../../actions/paychecks_actions';
import { getLevelSalaries } from '../../actions/level_salary_actions';
import TeacherPaycheckList from './TeacherPaycheckList';

class TeacherPaychecks extends React.Component {
  componentWillMount() {
    this.props.getPaychecks(`?teacher_id=${this.props.teacher_id}`)
    this.props.getLevelSalaries()
  }

  levelToSalary = (level) => {
    let ls
    ls = this.props.levelSalaries.find(ele => {
      return ele.level === `${level}级`
    })
    return ls ? ls.rate : 0
  }

  render() {
    let paid = [],
        unpaid = [],
        paidSum = 0
    
    this.props.paychecks.forEach((pc, idx) => {
      if(pc.paid) {
        paid.push(pc)
        paidSum += pc.amount
      } else {
        unpaid.push(pc)
      }
    })

    let rate = this.props.rate ? this.props.rate : this.levelToSalary(this.props.teacher_level)
    let paidTable = paid.length > 0 ? <TeacherPaycheckList paychecks={paid} rate={rate} /> 
                                      : 
                                      <Row>
                                        <Col m={12} s={12}>
                                          <Card className='white r-box-shadow' textClassName='black-text' title=''>
                                          <h5 className="center">没有已付工资单</h5>
                                          </Card>
                                        </Col>
                                      </Row>;

    let unpaidTable = unpaid.length > 0 ? <TeacherPaycheckList paychecks={unpaid} rate={rate} />
                                            : 
                                            <Row>
                                              <Col m={12} s={12}>
                                                <Card className='white r-box-shadow' textClassName='black-text' title=''>
                                                <h5 className="center">没有待付工资单</h5>
                                                </Card>
                                              </Col>
                                            </Row>;

    return(
      <div>
        <h6 className="airbnb-font bold red-text">待付工资单</h6>
        {paidTable}
        <br/>
        <h6 className="airbnb-font bold green-text">已付工资单(总计: {paidSum.toFixed(2)}元)</h6>
        {unpaidTable}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    paychecks: state.paycheckData.paychecks,
    teacher_id: state.auth.identityData._id,
    rate: state.auth.identityData.rate,
    teacher_level: state.auth.identityData.level,
    levelSalaries: state.levelSalary.levelSalaries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPaychecks: (query) => {
      dispatch(getPaychecks(query))
    },
    getLevelSalaries: () => {
      dispatch(getLevelSalaries())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherPaychecks);