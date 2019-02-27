import React from 'react';
import { connect } from 'react-redux';

import PaycheckList from './PaycheckList';
import { updateTeacher } from '../../actions/teachers_actions';

class TeacherSalaryDetail extends React.Component {
  constructor(props) {
    super(props)

    this.input = React.createRef()
  }

  back = () => {
    this.props.back("BROWSE")
  }

  viewPaycheck = (paycheck) => {
    this.props.viewPaycheck(paycheck)
  }

  handleSubmit = (e) => {
    let val = e.target.value
    if(!val) {
      window.Materialize.toast('数值不能为0', 1000);
    }
  }

  render() {
    let reportsContent = <h6 className="airbnb-font center">教师没有课后反馈表</h6>
    if(this.props.paychecks.length > 0) {
      reportsContent = <PaycheckList paychecks={this.props.paychecks} viewPaycheck={this.viewPaycheck} />
    }

    return(
      <div>
        <button className="btn white black-text" onClick={this.back}>返回</button>
        <h6 className="airbnb-font bold cyan-text">教师信息</h6>
        <table>
          <thead>
            <tr>
              <th>教师姓名</th>
              <th>教师等级</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{this.props.teacher.name}</td>
              <td>{this.props.teacher.level}级</td>
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
    paychecks: state.paycheckData.paychecks
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateTeacher: (id, field) => {
      dispatch(updateTeacher(id, field))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSalaryDetail);