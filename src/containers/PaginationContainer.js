import React from 'react';
import { Row, Col, Table } from 'react-materialize';

import Pagination from '../components/layouts/Pagination';
import Book from '../components/books/book';
import SearchTeacherList from '../containers/assets/SearchTeacherList';

class PaginationContainer extends React.Component {
  constructor(props) {
    super(props);
    let pages = Math.ceil((this.props.data.length / this.props.itemsPerPage));
    this.state = {
      pages: pages,
      currentPage: 1,
      searchQuery: ''
    };

    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  updateCurrentPage(i) {
    let pageToGo = this.state.currentPage + i;
    let currentPage = ((pageToGo <= 0) || (pageToGo > this.state.pages)) ? this.state.currentPage : pageToGo;
    this.setState({
      currentPage: currentPage
    });
  }

  goToPage(page) {
    this.setState({
      currentPage: page
    });
  }

  render() {
    let content = "";
    let startIdx = (this.state.currentPage - 1) * this.props.itemsPerPage;
    let data = this.props.data.slice(startIdx, startIdx + this.props.itemsPerPage);
    if(this.props.content === "BOOK") {
      content = <h5 className="center">没有绘本</h5>;
      if(data.length > 0) {
        let bookList = data.map((book, index) => {
          return (
            <Book key={index} id={index} book={book} readOnly={this.props.readOnly} />
          );
        });
        content = <Row>
                    <Col m={12}>
                      <Table>
                        <thead>
                          <tr>
                            <th>Lighters级别</th>
                            <th>RAZ级别</th>
                            <th>Lexile级别</th>
                            <th>年龄段</th>
                            <th>绘本分类</th>
                            <th>系列名</th>
                            <th>绘本名</th>
                            <th colSpan="3">更多操作</th>
                          </tr>
                        </thead>
  
                        <tbody>
                          {bookList}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
      }
    } else if (this.props.content === "REPORT") {
      content = <h5 className="center">没有课后反馈表</h5>;
      if(data.length > 0) {
        let reportList = data.map((report, index) => {
          return (
            <tr key={index} id={index}>
              <td>第{ index + 1 }次</td>
              <td>{ report.course_date } - {report.start_time } - {report.end_time}</td>
              <td>{ report.teacher_id.englishname }</td>
              <td>{ report.course_id.name }</td>
              <td><button className="btn" onClick={this.editReport}>查看课程回馈表</button></td>
            </tr>
          );
        });
        content = <Row>
                    <Col m={12}>
                      <Table>
                        <thead>
                          <tr>
                            <th>课程回馈表</th>
                            <th>上课时间</th>
                            <th>老师</th>
                            <th>课程</th>
                            <th colSpan="1"></th>
                          </tr>
                        </thead>
  
                        <tbody>
                          {reportList}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
      }
    } else if (this.props.content === "TEACHERS") {
      content = data.length > 0 ? <SearchTeacherList teachers={data} /> : <h5 className="center">当前没有教师</h5>
    }

    return(
      <div>
        {content}
        <Pagination 
          currentPage = {this.state.currentPage}
          pages = {this.state.pages}
          updateCurrentPage = {this.updateCurrentPage}
          goToPage = {this.goToPage}
        />
      </div>
    );
  }
};

export default PaginationContainer;