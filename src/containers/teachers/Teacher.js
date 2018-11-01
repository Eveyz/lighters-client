import React from 'react';
import { connect } from 'react-redux';
import '../../css/App.css';

class Teacher extends React.Component {

  render() {
    return(
      <tr>
        <td>{this.props.teacher.lastname}</td>
        <td>{this.props.teacher.firstname}</td>
        <td>{this.props.teacher.age}</td>
        <td>{this.props.teacher.birthday}</td>
        <td>{this.props.teacher.gender}</td>
        <td><a>查看</a></td>
        <td><a>编辑</a></td>
        <td><a>注销</a></td>
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
  // Whenever search is called, the result should be passed to all reducers
  return {
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
