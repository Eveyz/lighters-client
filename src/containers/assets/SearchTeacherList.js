import React from 'react';
import { connect } from 'react-redux';

import { selectTeacher, getTeacherReports } from '../../actions/teachers_actions';
import { setMode } from '../../actions/mode_action';

class SearchTeacherList extends React.Component {
  levelToSalary = (level) => {
    let ls
    ls = this.props.levelSalaries.find(ele => {
      return ele.level === `${level}级`
    })
    return ls ? ls.rate : 0
  }

  selectTeacher = (teacher, teacher_id) => e => {
    this.props.selectTeacher(teacher)
    this.props.getTeacherReports(teacher_id)
    this.props.setMode("VIEW_TEACHER")
  }
  
  render() {
    let teacherList = this.props.teachers.map((teacher, idx) => {
      return <tr
              key={idx} 
              onClick={this.selectTeacher(teacher, teacher._id)} 
              className="action-hide clickable"
             >
                <td>{teacher.lastname}{teacher.firstname}</td>
                <td>{teacher.level}级</td>
                <td>{this.levelToSalary(teacher.level)}</td>
              </tr>
    })
    let teacherContent = <table className="highlight">
                          <thead>
                            <tr>
                              <th>教师姓名</th>
                              <th>教师等级</th>
                              <th>工资每课时/元</th>
                            </tr>
                          </thead>

                          <tbody>
                            {teacherList}
                          </tbody>
                        </table>

    return(
      <div>
        {teacherContent}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    levelSalaries: state.levelSalary.levelSalaries.map(ls => {
      return { level: ls.level, rate: ls.rate }
    }),
    mode: state.mode.value
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectTeacher: (teacher) => {
      dispatch(selectTeacher(teacher))
    },
    getTeacherReports: (teacher_id) => {
      dispatch(getTeacherReports(teacher_id))
    },
    setMode: (mode) => {
      dispatch(setMode(mode))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTeacherList)