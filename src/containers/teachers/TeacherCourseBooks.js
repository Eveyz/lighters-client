import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-materialize';

class TeacherCourseBooks extends React.Component {
  render() {
    let bookList = <h5 className="center">当前没有绘本</h5>;

    if(this.props.course.books.length > 0) {
      bookList = this.props.course.books.map((book, idx) => {
        return <tr key={idx}>
                <td>{ book.rlevel }</td>
                <td>{ book.lslevel }</td>
                <td>{ book.age }</td>
                <td>{ book.category }</td>
                <td>{ book.serials }</td>
                <td>{ book.name }</td>
                <td><Link target="_blank" to={`/books/${book._id}`} className="btn" params={book}>查看</Link></td>
               </tr>
      });
    }

    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow' textClassName='black-text' title={this.props.course.name} style={{padding: "30px"}}>
            <div className="row">
              <div className="col m12">
                <table className="striped">
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
          </Card>
        </Col>
      </Row>
    )
  }
}

export default TeacherCourseBooks;