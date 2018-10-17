import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Card } from 'react-materialize';

import Breadcrumb from '../../components/layouts/Breadcrumb';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Student from '../../containers/students/Student';

class StudentList extends React.Component {

  componentWillMount() {
  }

  render() {
    let pendingStudentList;
    let pendingStudent = [];
    let activeStudentList;
    let activeStudent = [];
    if(this.props.students.length > 0) {
      this.props.students.map((student, index) => {
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
                                        <th></th>
                                        <th></th>
                                        <th></th>
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
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {activeStudentList}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row> :
                              <Card className='white' textClassName='blue-text'>
                                <h4 className="center">没有学生</h4>
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
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"><a className="active" href="#activeStudent">当前学生</a></li>
                <li className="tab col s3"><a href="#pendingStudent">试课学生</a></li>
              </ul>
            </div>
            <div id="activeStudent" className="col s12">
              {activeStudentTable}
            </div>
            <div id="pendingStudent" className="col s12">
              {pendingStudentTable}
            </div>
          </div>
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
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);