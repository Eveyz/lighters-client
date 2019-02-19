import React from 'react';
import { connect } from 'react-redux';

import PaycheckList from './PaycheckList';
import { updateTeacher } from '../../actions/teachers_actions';

class TeacherSalaryDetail extends React.Component {
  constructor(props) {
    super(props)

    this.input = React.createRef()
  }

  state = {
    mode: "VIEW"
  }

  changeMode = (e) => {
    this.setState({mode: "EDIT"})
  }

  back = () => {
    this.props.back("BROWSE")
  }

  viewPaycheck = (paycheck) => {
    this.props.viewPaycheck(paycheck)
  }

  cancel = () => {
    this.setState({mode: "VIEW"})
  }

  handleSubmit = (e) => {
    let val = e.target.value
    if(!val) {
      window.Materialize.toast('数值不能为0', 1000);
    } else {
      this.props.updateTeacher(this.props.teacher._id, {rate: val})
      this.setState({mode: "VIEW"})
    }
  }

  render() {
    let reportsContent = <h6 className="airbnb-font center">教师没有课后反馈表</h6>
    if(this.props.paychecks.length > 0) {
      reportsContent = <PaycheckList paychecks={this.props.paychecks} viewPaycheck={this.viewPaycheck} />
    }
    console.log(this.state);
    let td = this.state.mode === "EDIT" ? 
            <input 
              style={{width: "150px", marginRight: "30px"}}
              defaultValue={this.props.teacher.rate} 
              type="number" 
              ref={this.input}
              onBlur={this.handleSubmit}
              autoFocus
            /> : this.props.teacher.rate
    let classes = this.state.mode === "EDIT" ? "no-padding" : "clickable hover-highlight"

    return(
      <div>
        <button className="btn white black-text" onClick={this.back}>返回</button>
        <h6 className="airbnb-font bold cyan-text">教师信息</h6>
        <table>
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
              <td className={classes} onClick={this.changeMode}>{td}</td>
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