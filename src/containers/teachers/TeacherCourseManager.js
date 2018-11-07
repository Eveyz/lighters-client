import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../css/App.css'
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import PathNavigator from '../../components/layouts/PathNavigator';
import { selectStudent } from '../../actions/students_actions';
import { updateBooks } from '../../actions/select_book_actions';

class TeacherCourseManager extends React.Component {
  constructor(props) {
    super(props)

    this.newReport = this.newReport.bind(this);
  }

  newReport = student => e => {
    let path = "/teachers/" + this.props.user_id + "/new_report";
    this.props.updateBooks([], [], []);
    this.props.setStudent(student, path);
  }

  reportsList = student => e => {
    let path = "/teachers/" + this.props.user_id + "/reports";
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
                <td><button onClick={this.newReport(student)} className="btn">填写新课程回馈表</button></td>
                <td><button onClick={this.reportsList(student)} className="btn cyan">查看所有课程回馈表</button></td>
               </tr>
      });
    }

    return(
      <div>
        <Header />
        <div className="page-min-height">
          <PathNavigator path={"/teachers/" + this.props.user_id + "/dashboard"} content={this.props.course.name} />
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
      dispatch(selectStudent(student, path))
    },
    updateBooks: (review_books, new_books, future_books) => {
      dispatch(updateBooks(review_books, new_books, future_books))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCourseManager);