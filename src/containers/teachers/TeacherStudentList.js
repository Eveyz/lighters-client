import React from 'react';

import { Row, Col, Card } from 'react-materialize';

class TeacherStudentList extends React.Component {
  render() {
    const students = this.props.students.map((student, index) => {
      return <tr key={index}>
              <td>{ student.lastname + student.firstname }</td>
              <td>{ student.englishname }</td>
              <td>{ student.age }</td>
              <td><button className="btn cyan">查看学生档案</button></td>
            </tr>
    });

    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow' textClassName='black-text' title={"学生"} style={{padding: "30px"}}>
            <div className="row">
              <div className="col m12">
                <table className="striped">
                  <thead>
                    <tr>
                      <th>学生姓名</th>
                      <th>学生英文名</th>
                      <th>学生年龄</th>
                      <th colSpan="1"></th>
                    </tr>
                  </thead>
          
                  <tbody>
                    {students}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default TeacherStudentList;