import React from 'react';
import { connect } from 'react-redux';
import '../../css/App.css';

import { updateTeacher } from '../../actions/teachers_actions';

class Teacher extends React.Component {
  constructor(props) {
    super(props)

    this.updateTeacher = this.updateTeacher.bind(this);
  }

  updateTeacher = () => {
    let field = this.props.teacher.status === "pending" ? {status: "active"} : {status: "pending"};
    this.props.updateTeacher(this.props.teacher._id, field);
  }

  render() {
    let action = "关闭";
    let classes = "btn amber";
    if(this.props.teacher.status === "pending") {
      action = "激活";
      classes = "btn green";
    }

    return(
      <tr>
        <td>{this.props.teacher.lastname}</td>
        <td>{this.props.teacher.firstname}</td>
        <td>{this.props.teacher.age}</td>
        <td>{this.props.teacher.birthday}</td>
        <td>{this.props.teacher.gender}</td>
        <td><button className={classes} onClick={this.updateTeacher}>{action}</button></td>
        <td>
          <a className='dropdown-trigger btn cyan' href='#' data-target={this.props.id}>更多操作</a>

          <ul id={this.props.id} className='dropdown-content'>
            <li><a href="#!">编辑</a></li>
            <li><a href="#!">查看</a></li>
            <li><a href="#!" className="red-text">注销</a></li>
          </ul>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    teachers: state.teachersData.teachers,
    students: state.studentsData.students
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateTeacher: (id, field) => dispatch(updateTeacher(id, field))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
