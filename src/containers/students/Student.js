import React from 'react';
import { connect } from 'react-redux';
import '../../css/App.css';
import { updateStudent } from '../../actions/students_actions';

class Student extends React.Component {
  constructor(props) {
    super(props);

    this.updateStudent = this.updateStudent.bind(this);
  }

  updateStudent = () => {
    let field = this.props.student.status === "pending" ? {status: "active"} : {status: "pending"};
    this.props.updateStudent(this.props.student._id, field);
  }

  render() {
    let action = "关闭";
    let classes = "btn amber";
    if(this.props.student.status === "pending") {
      action = "激活";
      classes = "btn green";
    }

    return(
      <tr>
        <td>{this.props.student.lastname}</td>
        <td>{this.props.student.firstname}</td>
        <td>{this.props.student.age}</td>
        <td>{this.props.student.birthday}</td>
        <td>{this.props.student.gender}</td>
        <td><button className={classes} onClick={this.updateStudent}>{action}</button></td>
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
    updateStudent: (id, field) => dispatch(updateStudent(id, field))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
