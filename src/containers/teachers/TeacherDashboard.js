import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-materialize'
import M from 'materialize-css';
import _ from 'lodash';

import 'tui-calendar/dist/tui-calendar.min.css';
import '../../css/App.css';
import TeacherCourse from '../../containers/teachers/TeacherCourse';
import TeacherStudentList from '../../containers/teachers/TeacherStudentList';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import TeacherCourseBooks from './TeacherCourseBooks';
import TuiCalendar from '../TuiCalendar';

class TeacherDashboard extends React.Component {

  componentDidMount() {
    M.AutoInit();

  }

  render() {
    if(_.isEmpty(this.props.teacher) || this.props.teacher.status === "pending") {
      return (
        <div>
          <Header />
          <div className="page-min-height">
            <div style={{backgroundColor: "#ffca28", padding: "10px 0px 13px 0px"}}>
              <div className="container">
                <div className="row no-margin">
                  <div className="col s12">
                    <h5 className="white-text" style={{fontWeight: "500"}}>Welcome, {this.props.teacher.lastname + "老师"}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <Row>
                <Col m={12} s={12}>
                  <Card className='white r-box-shadow' textClassName='black-text' title=''>
                  <h5 className="center"><b>当前处于试课和评定环节, 试课结束之后网站将会开放</b></h5>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <Footer />
        </div>
      )
    }

    let courses = <Row>
                    <Col m={12} s={12}>
                      <Card className='white r-box-shadow' textClassName='black-text' title=''>
                      <h5 className="center">当前没有课程</h5>
                      </Card>
                    </Col>
                  </Row>;
    if(this.props.teacher.courses.length > 0) {
      courses = this.props.teacher.courses.map((course, idx) => {
        return <TeacherCourse key={idx} user_id={this.props.user_id} course={course} />
      });
    };

    let students = <Row>
                    <Col m={12} s={12}>
                      <Card className='white r-box-shadow' textClassName='black-text' title=''>
                      <h5 className="center">当前没有学生</h5>
                      </Card>
                    </Col>
                  </Row>;
    let studentsArr = [];
    if(this.props.teacher.courses.length > 0) {
      this.props.teacher.courses.forEach((c) => {
        studentsArr = [...new Set(studentsArr.concat(c.students))];
      });
    }
    if(studentsArr.length > 0) {
      students = <TeacherStudentList students={studentsArr} />;
    }

    let books = <Row>
                  <Col m={12} s={12}>
                    <Card className='white r-box-shadow' textClassName='black-text' title=''>
                    <h5 className="center">当前没有绘本</h5>
                    </Card>
                  </Col>
                </Row>;
    if(this.props.teacher.courses.length > 0) {
      books = this.props.teacher.courses.map((c, index) => {
        return <TeacherCourseBooks key={index} course={c} />
      });
    }

    return(
      <div>
        <Header />
        <div className="page-min-height">
          <div style={{backgroundColor: "#ffca28", padding: "10px 0px 13px 0px"}}>
            <div className="container">
              <div className="row no-margin">
                <div className="col s12">
                  <h5 className="white-text" style={{fontWeight: "500"}}>Welcome, {this.props.teacher.lastname + "老师"}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <br/>
            <br/>
            <div className="row">
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab col s3"><a href="#teacher-calendar-tab">课程表</a></li>
                  <li className="tab col s3"><a href="#courses">课程以及课程反馈表</a></li>
                  <li className="tab col s3"><a href="#students">学生</a></li>
                  <li className="tab col s3"><a href="#books">绘本</a></li>
                </ul>
              </div>
              <div id="teacher-calendar-tab" className="col s12 m12">
                <br />
                <TuiCalendar isReadOnly={false} />
              </div>
              <div id="courses" className="col s12">
                <br/>
                <div className="row">
                  <div className="col m12">
                    <h4><b>课程</b></h4>
                    <div className="row">
                      {courses}
                    </div>
                  </div>
                </div>
              </div>
              <div id="students" className="col s12">
                <br/>
                <div className="row">
                  <div className="col m12">
                    {students}
                  </div>
                </div>
              </div>
              <div id="books" className="col s12">
                <br/>
                <div className="row">
                  <div className="col m12">
                    {books}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    teacher: state.auth.identityData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard);