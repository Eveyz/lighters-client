import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';

import '../../css/App.css'
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import PathNavigator from '../../components/layouts/PathNavigator';

import { setMode } from '../../actions/mode_action';
import { selectStudent } from '../../actions/students_actions';
import { updateBooks } from '../../actions/select_book_actions';
import { selectBook } from '../../actions/books_actions';

class TeacherCourseManager extends React.Component {
  constructor(props) {
    super(props)

    this.newReport = this.newReport.bind(this);
    this.back = this.back.bind(this);
  }

  back() {
    // this.props.setMode("courses")
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

  selectBook = book => e => {
    e.preventDefault()
    this.props.selectBook(book, `/books/${book._id}/show`)
  }

  render() {
    let students = <Row>
                    <Col m={12} s={12}>
                      <Card className='white r-box-shadow' textClassName='black-text' title=''>
                      <h5 className="center">课程没有学生</h5>
                      </Card>
                    </Col>
                  </Row>;
    
    let books = <Row>
                    <Col m={12} s={12}>
                      <Card className='white r-box-shadow' textClassName='black-text' title=''>
                      <h5 className="center">当前没有绘本</h5>
                      </Card>
                    </Col>
                  </Row>;

    if(this.props.course.students.length > 0) {
      let studentsList = this.props.course.students.map((student, idx) => {
        return <tr key={idx}>
                <td>{ student.englishname }</td>
                <td>{ student.lastname + student.firstname }</td>
                <td>{ student.age }</td>
                <td>{ this.props.course.name }</td>
                {
                  this.props.course.status === "active" ? <td><button onClick={this.newReport(student)} className="btn">填写新课程回馈表</button></td> : null
                }
                <td><button onClick={this.reportsList(student)} className="btn cyan">查看所有课程回馈表</button></td>
               </tr>
      });

      students = <div className="row">
                    <div className="col m12">
                      <table className="highlight">
                        <thead>
                          <tr>
                            <th>学生英文名</th>
                            <th>学生姓名</th>
                            <th>学生年龄</th>
                            <th>课程</th>
                            <th colSpan="2"></th>
                          </tr>
                        </thead>

                        <tbody>
                          {studentsList}
                        </tbody>
                      </table>
                    </div>
                  </div>
    }

    if(this.props.course.books.length > 0) {
      let bookList = this.props.course.books.map((book, idx) => {
        return <tr key={idx}>
                <td>{ book.rlevel }</td>
                <td>{ book.lslevel }</td>
                <td>{ book.age }</td>
                <td>{ book.category }</td>
                <td>{ book.serials }</td>
                <td>{ book.name }</td>
                <td><a href="" onClick={this.selectBook(book)} target="_blank">查看</a></td>
               </tr>
      });

      books = <div className="row">
                <div className="col m12">
                  <table className="highlight">
                    <thead>
                      <tr>
                        <th>RAZ等级</th>
                        <th>蓝思等级</th>
                        <th>年龄段</th>
                        <th>绘本分类</th>
                        <th>系列名</th>
                        <th>绘本名</th>
                        <th colSpan="2"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {bookList}
                    </tbody>
                  </table>
                </div>
              </div>
    }

    return(
      <div>
        <Header />
        <div className="page-min-height">
          <PathNavigator 
            path={"/teachers/" + this.props.user_id + "/dashboard"} 
            content={this.props.course.name} 
            back={this.back}
          />
          <div className="container">
            <div className="row no-margin">
              <div className="col m12">
                <h5><b>学生</b></h5>
              </div>
            </div>
            {students}

            <div className="row no-margin">
              <div className="col m12">
                <h5><b>绘本</b></h5>
              </div>
            </div>
            {books}
          </div>
        </div>
        <br/>
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
    setMode: (mode) => {
      dispatch(setMode(mode))
    },
    selectBook: (book, path) => {
      dispatch(selectBook(book, path))
    },
    setStudent: (student, path) => {
      dispatch(selectStudent(student, path))
    },
    updateBooks: (review_books, new_books, future_books) => {
      dispatch(updateBooks(review_books, new_books, future_books))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCourseManager);