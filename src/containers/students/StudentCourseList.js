import React from 'react';
import { Row, Col, Card } from 'react-materialize';

class StudentCourseList extends React.Component {
  render() {
    let courseList = <h5 className="center">当前没有课程</h5>;
    
    if(this.props.courses.length > 0) {
      courseList = this.props.courses.map((course, idx) => {
        let nameList = course.teachers.map((teacher, index) => {
          return (
            <span key={index}>{teacher.lastname + teacher.firstname}</span>
          )
        });
        return <div key={idx} className="col s12 m6">
                <div className="card r-box-shadow">
                  <div className="card-content">
                    <span className="card-title cyan-text" style={{fontWeight: "400"}}><b>{ course.name }</b></span>
                    <p>授课老师: { nameList }</p>
                    <p>课程级别: { course.level }</p>
                    <p>学生数量: { course.students.length }</p>
                    <p>绘本数量: { course.books.length }</p>
                  </div>
                </div>
              </div>
      });
    }

    return(
      <div>
        {courseList}
      </div>
    )
  }
}

export default StudentCourseList;