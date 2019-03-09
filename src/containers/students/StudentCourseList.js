import React from 'react';
import { Row, Col } from 'react-materialize';

import PaginationContainer from '../PaginationContainer';
import BookList from '../books/BookList';
import { COURSE_TOP_BAR_COLOR } from '../../ultis'
import CD1 from '../../images/course_decoration1.svg'
import CD2 from '../../images/course_dec2.svg'
import CD3 from '../../images/course_dec3.svg'

class StudentCourseList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      render: "course",
      course: ""
    };

    this.checkReports = this.checkReports.bind(this);
    this.checkBooks = this.checkBooks.bind(this);
    this.back = this.back.bind(this);
  }

  checkReports = (e, id) => {
    e.preventDefault();
    this.setState({render: "report", course: id});
  }

  checkBooks = (e, id) => {
    e.preventDefault();
    this.setState({render: "book", course: id});
  }

  back = (e) => {
    e.preventDefault();
    this.setState({render: "course", course: ""});
  }

  render() {
    let content = <div className="card white r-box-shadow">
                    <div className="card-content">
                      <h5 className="center">当前没有课程</h5>
                    </div>
                  </div>;
    
    if(this.props.courses.length > 0) {
      if(this.state.render === "course") {
        content = this.props.courses.map((course, idx) => {
          let nameList = course.teachers.map((teacher, index) => {
            return (
              <span key={index}>{teacher.lastname + teacher.firstname}</span>
            )
          });
          let cls_color = COURSE_TOP_BAR_COLOR[idx%3]
          const _img = idx%3 === 0 ? CD1 : idx%3 === 1 ? CD2 : CD3
          return <div key={idx} className="col s12 m6">
                  <div className="card r-box-shadow">
                    {/* <div className="course-top-bar" style={cls_color}></div>
                    <img className="course-left-top-img" src={_img} alt="course-decoration" /> */}
                    <div className="card-content">
                      <span className="card-title cyan-text" style={{fontWeight: "400"}}><b>{ course.name }</b></span>
                      <p>授课老师: { nameList }</p>
                      <p>课程级别: { course.level }</p>
                      <p>绘本数量: { course.books.length }</p>
                    </div>
                    <div className="card-action">
                      <a href="" onClick={(e) => this.checkReports(e, course._id)}>查看所有课后反馈表</a>
                      <a href="" onClick={(e) => this.checkBooks(e, course._id)}>查看课程绘本</a>
                    </div>
                  </div>
                </div>
        });
      } else if (this.state.render === "book") {
        let current_course = this.state.course;
        let _course = this.props.courses.find((c) => {
          return c._id === current_course;
        });
        content = <Col m={12} s={12}>
                    <div className="card r-box-shadow">
                      <div className="card-content">
                        <button className="btn white black-text" onClick={(e) => this.back(e)}>返回</button>
                        <PaginationContainer 
                          itemsPerPage={10} 
                          data={_course.books} 
                          readOnly={false} 
                        >
                          <BookList />
                        </PaginationContainer>
                      </div>
                    </div>
                  </Col>;
      } else if (this.state.render === "report") {
        let current_course = this.state.course;
        let _reports = [];
        this.props.reports.forEach((report) => {
          if(report.course_id._id === current_course)
            _reports.push(report);
        });
        content = <Col m={12} s={12}>
                    <div className="card r-box-shadow">
                      <div className="card-content">
                        <button className="btn white black-text" onClick={(e) => this.back(e)}>返回</button>
                        <PaginationContainer itemsPerPage={10} data={_reports} content={"REPORT"} readOnly={true} />
                      </div>
                    </div>
                  </Col>
      }
    }

    let title = <h6>当前所有课程</h6>;
    if(this.state.render === "book") {
      title = <h6>绘本资料</h6>;
    } else if(this.state.render === "report") {
      title = <h6>课程反馈表</h6>;
    }

    return(
      <div>
        {title}
        <Row>
          {content}
        </Row>
      </div>
    )
  }
}

export default StudentCourseList;