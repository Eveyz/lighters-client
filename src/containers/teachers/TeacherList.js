import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { Row, Col, Table, Card } from 'react-materialize';

import Teacher from '../../containers/teachers/Teacher';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import { getTeachers, getTeacher } from '../../actions/teachers_actions';

class TeacherList extends React.Component {
  constructor(props) {
    super(props);

    this.active = "active";
  }

  componentWillMount() {
    this.props.getTeachers()
  }

  componentDidMount() {
    M.AutoInit();
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
          <Teacher key={index} id={`pending${index}`} teacher={teacher} />
        );
      });

      activeTeacherList = activeTeacher.map((teacher, index) => {
        return (
          <Teacher key={index} id={`active${index}`} teacher={teacher} />
        )
      });
    }

    let pendingTeacherTable = pendingTeacher.length > 0 ?
                              <Row>
                                <Col m={12}>
                                  <Table className="highlight">
                                    <thead>
                                      <tr>
                                        <th>姓名</th>
                                        <th>年龄</th>
                                        <th>级别</th>
                                        <th>性别</th>
                                        <th>更改状态</th>
                                        <th>更多操作</th>
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
                                  <Table className="highlight">
                                    <thead>
                                      <tr>
                                        <th>姓名</th>
                                        <th>年龄</th>
                                        <th>级别</th>
                                        <th>性别</th>
                                        <th>更改状态</th>
                                        <th>更多操作</th>
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

    let active = this.active === "active" ? "active" : "";
    let pending = this.active !== "active" ? "active" : "";
    return (
      <div>
        <Header />
        <Breadcrumb action="teachers" />
        <div className="container">
          <br />
          <Row>
            <Col m={12}>
              <Link to="/admin/teachers/new">
                <button className="btn">添加教师</button>
              </Link>
            </Col>
          </Row>
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"><a className={active} href="#active" onClick={(e) => this.active = "active"}>在职教师({activeTeacher.length})</a></li>
                <li className="tab col s3"><a onClick={(e) => this.active = "pending"} className={pending} href="#pending">待定教师({pendingTeacher.length})</a></li>
              </ul>
            </div>
            <div id="active" className="col s12">{activeTeacherTable}</div>
            <div id="pending" className="col s12">{pendingTeacherTable}</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.teachersData.teachers
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTeachers: () => {
      dispatch(getTeachers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherList);