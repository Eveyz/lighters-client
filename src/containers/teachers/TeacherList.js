import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table, Card, Tabs, Tab } from 'react-materialize';

import Teacher from '../../containers/teachers/Teacher';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';

class TeacherList extends React.Component {

  componentWillMount() {
    // this.props.fetchBooks();
  }

  render() {
    let pendingTeacherList;
    let pendingTeacher = [];
    let activeTeacherList;
    let activeTeacher = [];
    if(this.props.teachers.length > 0) {
      this.props.teachers.forEach((teacher) => {
        if(teacher.status === "pending") pendingTeacher.push(teacher);
        else if(teacher.status === "active") activeTeacher.push(teacher);
      });

      pendingTeacherList = pendingTeacher.map((teacher, index) => {
        return (
          <Teacher key={index} id={index} teacher={teacher} />
        );
      });

      activeTeacherList = activeTeacher.map((teacher, index) => {
        return (
          <Teacher key={index} id={index} teacher={teacher} />
        )
      });
    }

    let pendingTeacherTable = pendingTeacher.length > 0 ?
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
                                      {pendingTeacherList}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row> :
                              <Card className='white' textClassName='blue-text'>
                                <h4 className="center">当前没有待定教师</h4>
                              </Card>
    
    let activeTeacherTable = activeTeacher.length > 0 ? 
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
                                      {activeTeacherList}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row> :
                              <Card className='white' textClassName='blue-text'>
                                <h4 className="center">当前没有在职教师</h4>
                              </Card>

    return (
      <div>
        <Header />
        <Breadcrumb action="teachers" />
        <div className="container">
          <br />
          <Row>
            <Col m={12}>
              <button className="btn">添加教师</button>
            </Col>
          </Row>
          <Tabs>
            <Tab title="在职教师" active>
              {activeTeacherTable}
            </Tab>
            <Tab title="待定教师">
              {pendingTeacherTable}
            </Tab>
          </Tabs>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    teachers: state.teachersData.teachers
  };
}

// Any thing returned from this function will end up as props on the BookList component
// const mapDispatchToProps = dispatch => {
//   // Whenever search is called, the result should be passed to all reducers
//   return {
//   }; // this.props.doSearch will become the result of headSearch
// }

export default connect(mapStateToProps, null)(TeacherList);