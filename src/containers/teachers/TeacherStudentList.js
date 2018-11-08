import React from 'react';

class TeacherStudentList extends React.Component {
  render() {
    const students = this.props.students.map((student, index) => {
      return <tr key={index}>
              <td>{ student.lastname + student.firstname }</td>
              <td>{ student.englishname }</td>
              <td>{ student.age }</td>
            </tr>
    });

    return(
      <table className="striped">
        <thead>
          <tr>
            <th>学生姓名</th>
            <th>学生英文名</th>
            <th>学生年龄</th>
            <th colSpan="2"></th>
          </tr>
        </thead>

        <tbody>
          {students}
        </tbody>
      </table>
    )
  }
}

export default TeacherStudentList;