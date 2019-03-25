import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from '../../actions/students_actions';

import M from 'materialize-css';

class Student extends React.Component {
  constructor(props) {
    super(props);

    this.dropdown = React.createRef();
    this.updateStudent = this.updateStudent.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    M.Dropdown.init(this.dropdown.current, {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true,
      hover: true
    });
  }

  updateStudent = () => {
    let field = (this.props.student.status === "pending" || this.props.student.status === "inactive") ? {status: "active"} : {status: "inactive"};
    this.props.updateStudent(this.props.student._id, field);
  }

  render() {
    let action = "关闭";
    let classes = "btn amber";
    if(this.props.student.status === "pending" || this.props.student.status === "inactive") {
      action = "激活";
      classes = "btn green";
    }

    const cls = this.props.student.tuition_amount < 0 ? "red-text" : null

    if(this.props.tab === "RESET_REQUIRED") {
      return (
        <tr>
          <td><Link to={`/students/${this.props.student._id}/view`}><span className="airbnb-font">{this.props.student.englishname}</span></Link></td>
          <td>{this.props.student.lastname + this.props.student.firstname}</td>
          <td>{this.props.student.age}</td>
          <td className={cls}>{this.props.student.tuition_amount}</td>
          <td>{this.props.student.gender}</td>
          <td>{this.props.student.city}</td>
          <td>{this.props.student.systemid}</td>
          <td>
            <a ref={this.dropdown} className='dropdown-trigger btn blue-grey bold' href='' data-target={this.props.id}>更多操作</a>

            <ul id={this.props.id} className='dropdown-content'>
              <li><Link to={`/admin/students/${this.props.student._id}/edit`} className="aribnb-font bold">编辑</Link></li>
              <li><Link to={`/students/${this.props.student._id}`} className="aribnb-font bold">查看</Link></li>
              <li className="divider"></li>
              <li><a className="aribnb-font bold red-text" href="">注销</a></li>
            </ul>
          </td>
        </tr>
      )
    }

    return(
      <tr>
        <td><Link to={`/students/${this.props.student._id}/view`}><span className="airbnb-font">{this.props.student.englishname}</span></Link></td>
        <td>{this.props.student.lastname + this.props.student.firstname}</td>
        <td>{this.props.student.age}</td>
        <td className={cls}>{this.props.student.tuition_amount}</td>
        <td>{this.props.student.gender}</td>
        <td>{this.props.student.city}</td>
        <td><button className={classes} onClick={this.updateStudent}>{action}</button></td>
        <td>
          <a ref={this.dropdown} className='dropdown-trigger btn cyan' href='' data-target={this.props.id}>更多操作</a>

          <ul id={this.props.id} className='dropdown-content'>
            <li><Link to={`/admin/students/${this.props.student._id}/edit`} className="aribnb-font bold">编辑</Link></li>
            <li><Link to={`/students/${this.props.student._id}`} className="aribnb-font bold">查看</Link></li>
            <li><a href="" className="red-text">注销</a></li>
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
