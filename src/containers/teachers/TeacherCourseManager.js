import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../css/App.css'
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import { selectStudent } from '../../actions/students_actions';

class TeacherCourseManager extends React.Component {
  constructor(props) {
    super(props)

    this.newReport = this.newReport.bind(this);
  }

  newReport = student => e => {
    let path = "/teachers/" + this.props.user_id + "/new_report";
    console.log(student);
    this.props.setStudent(student, path);
  }

  render() {
    let students = <Row>
                    <Col m={12} s={12}>
                      <Card className='white r-box-shadow' textClassName='black-text' title=''>
                      <h5 className="center">当前没有学生</h5>
                      </Card>
                    </Col>
                  </Row>;

    if(this.props.course.students.length > 0) {
      students = this.props.course.students.map((student, idx) => {
        return <tr key={idx}>
                <td>{ student.lastname + student.firstname }</td>
                <td>{ student.englishname }</td>
                <td>{ student.age }</td>
                <td>{ this.props.course.name }</td>
                <td>{ this.props.course.reports.length }</td>
                <td><button onClick={this.newReport(student)} className="btn">填写新课程回馈表</button></td>
                <td><Link to={"/teachers/" + this.props.user_id + "/reports"} className="btn cyan">查看所有课程回馈表</Link></td>
               </tr>
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
                  <h5 className="white-text" style={{fontWeight: "500"}}> <Link to={"/teachers/" + this.props.user_id + "/dashboard"} style={{color: "white"}}>返回</Link> <span style={{color: "#eeeeee"}}> > { this.props.course.name }</span></h5>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h4><b>学生</b></h4>
            <div className="row">
              <div className="col m12">
                <table>
                  <thead>
                    <tr>
                      <th>学生姓名</th>
                      <th>学生英文名</th>
                      <th>学生年龄</th>
                      <th>课程</th>
                      <th>课程回馈表</th>
                      <th colSpan="2"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {students}
                  </tbody>
                </table>
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
    course: state.coursesData.currentCourse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStudent: (student, path) => {
      selectStudent(student, path)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCourseManager);