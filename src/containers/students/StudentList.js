import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { Row, Col, Table, Card, Tabs, Tab } from 'react-materialize';

import Breadcrumb from '../../components/layouts/Breadcrumb';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Student from '../../containers/students/Student';

class StudentList extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    let pendingStudentList;
    let pendingStudent = [];
    let activeStudentList;
    let activeStudent = [];
    if(this.props.students.length > 0) {
      this.props.students.forEach((student) => {
        if(student.status === "pending") pendingStudent.push(student);
        else if(student.status === "active") activeStudent.push(student);
      });

      pendingStudentList = pendingStudent.map((student, index) => {
        return (
          <Student key={index} id={index} student={student} />
        );
      });

      activeStudentList = activeStudent.map((student, index) => {
        return (
          <Student key={index} id={index} student={student} />
        )
      });
    }

    let pendingStudentTable = pendingStudent.length > 0 ?
                              <Row>
                                <Col m={12}>
                                  <Table>
                                    <thead>
                                      <tr>
                                        <th>姓</th>
                                        <th>名字</th>
                                        <th>年龄</th>
                                        <th>出生日期</th>
                                        <th>性别</th>
                                        <th>更改状态</th>
                                        <th>更多操作</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {pendingStudentList}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row> :
                              <Card className='white' textClassName='blue-text'>
                                <h4 className="center">没有试课学生</h4>
                              </Card>
    
    let activeStudentTable = activeStudent.length > 0 ? 
                              <Row>
                                <Col m={12}>
                                  <Table>
                                    <thead>
                                      <tr>
                                        <th>姓</th>
                                        <th>名字</th>
                                        <th>年龄</th>
                                        <th>出生日期</th>
                                        <th>性别</th>
                                        <th>更改状态</th>
                                        <th>更多操作</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {activeStudentList}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row> :
                              <Card className='white' textClassName='blue-text'>
                                <h4 className="center">没有上课的学生</h4>
                              </Card>

    return (
      <div>
        <Header />
        <Breadcrumb action="students" />
        <div className="container">
          <br />
          <Row>
            <Col m={12}>
              <button className="btn">添加学生</button>
            </Col>
          </Row>
          <Tabs>
            <Tab title="当前学生" active>
              {activeStudentTable}
            </Tab>
            <Tab title="试课学生">
              {pendingStudentTable}
            </Tab>
          </Tabs>
          
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    students: state.studentsData.students
  };
}

// Any thing returned from this function will end up as props on the BookList component
// const mapDispatchToProps = dispatch => {
//   // Whenever search is called, the result should be passed to all reducers
//   return {
//   }; // this.props.doSearch will become the result of headSearch
// }

export default connect(mapStateToProps, null)(StudentList);