import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { Row, Col, Table, Card } from 'react-materialize';

import Breadcrumb from '../../components/layouts/Breadcrumb';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Student from '../../containers/students/Student';

import { setLoadingStatus } from "../../actions/status_actions";
import { getStudents } from "../../actions/students_actions";

class StudentList extends React.Component {
  constructor(props) {
    super(props);

    this.active = "active";
  }

  componentWillMount() {
    this.props.setLoadingStatus(true);
    this.props.getStudents();
  }

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    let pendingStudentList;
    let pendingStudent = [];

    let activeStudentList;
    let activeStudent = [];

    let createdStudentList;
    let createdStudent = [];

    if(this.props.students.length > 0) {
      this.props.students.forEach((student) => {
        if(student.status === "pending") pendingStudent.push(student);
        else if(student.status === "active" || student.status === "RESET_REQUIRED") activeStudent.push(student);
        if(student.temporary) createdStudent.push(student);
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

      createdStudentList = createdStudent.map((student, index) => {
        return (
          <Student key={index} id={`created${index}`} student={student} tab="RESET_REQUIRED" />
        )
      });
    }

    let pendingStudentTable = pendingStudent.length > 0 ?
                              <Row>
                                <Col m={12}>
                                  <Table>
                                    <thead>
                                      <tr>
                                        <th>姓名</th>
                                        <th>英文名</th>
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
                                        <th>姓名</th>
                                        <th>英文名</th>
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

    let createdStudentTable = createdStudent.length > 0 ? 
                              <Row>
                                <Col m={12}>
                                  <Table className="highlight">
                                    <thead>
                                      <tr>
                                        <th>姓名</th>
                                        <th>英文名</th>
                                        <th>年龄</th>
                                        <th>性别</th>
                                        <th>临时邮箱</th>
                                        <th>临时用户名</th>
                                        <th>更多操作</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {createdStudentList}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row> :
                              <Card className='white' textClassName='blue-text'>
                                <h5 className="center">管理员生成的学生</h5>
                              </Card>

    let active = this.active === "active" ? "active" : "";
    let pending = this.active === "pending" ? "active" : "";
    let created = this.active === "created" ? "active" : "";

    return (
      <div>
        <Header />
        <Breadcrumb action="students" />
        <div className="container page-min-height">
          <br />
          <Row>
            <Col m={12}>
              <Link to="/admin/students/new">
                <button className="btn">添加学生</button>
              </Link>
            </Col>
          </Row>
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"><a className={active} href="#active" onClick={(e) => this.active = "active"}>上课学生({activeStudent.length})</a></li>
                <li className="tab col s3"><a onClick={(e) => this.active = "pending"} className={pending} href="#pending">试课学生({pendingStudent.length})</a></li>
                <li className="tab col s3"><a onClick={(e) => this.active = "created"} className={created} href="#created">管理员生成的学生({createdStudent.length})</a></li>
              </ul>
            </div>
            <div id="active" className="col s12">{activeStudentTable}</div>
            <div id="pending" className="col s12">{pendingStudentTable}</div>
            <div id="created" className="col s12">{createdStudentTable}</div>
          </div>
          
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    students: state.studentsData.students
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoadingStatus: (status) => {
      dispatch(setLoadingStatus(status))
    },
    getStudents: () => dispatch(getStudents()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);