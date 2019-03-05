import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../../css/App.css';
import Loading from '../../../components/Loading';
import { setLoadingStatus } from "../../../actions/status_actions";
import { logout, adminInit } from "../../../actions/users_actions.js";
import Header from '../../../components/layouts/Header';
import Breadcrumb from '../../../components/layouts/Breadcrumb';
import Footer from '../../../components/layouts/Footer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    this.props.setLoadingStatus(true);
    this.props.adminInit();
  }

  logout() {
    this.props.logout();
  }

  render() {
    var content = this.props.loading ? 
                  <Loading />
                  :
                  <div className="container">
                    <br/>
                    <div className="row">
                      <div className="col m12">
                        <h6 style={{color: "#171718", fontWeight: "700"}}>系统管理</h6>
                      </div>
                    </div>
                    
                    <div className="row">
                      <Link to="/admin/courses/all">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #69639a"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>课程管理</b></span>
                              <p>{this.props.courses} 个课程</p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <Link to="/admin/teachers/all">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #4c7ef3"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color airbnb-font" style={{fontWeight: "400"}}><b>教师管理</b></span>
                              <p>{this.props.teachers} 个教师</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="row">
                      <Link to="/admin/students/all">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #6df0c2"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>学生管理</b></span>
                              <p>{this.props.students} 个学生</p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <Link to="/admin/books/all">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #ffc107"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>绘本管理</b></span>
                              <p>{this.props.books} 本绘本</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="row">
                      <Link to="/assets/level_salaries">
                        <div className="col s12 m6">
                          <div className="card r-box-shadow link" style={{borderTop: "6px solid #FF5A5F"}}>
                            <div className="card-content" style={{padding: "30px"}}>
                              <span className="card-title black-text r-font-color" style={{fontWeight: "400"}}><b>资金管理</b></span>
                              <p>{this.props.paychecks} 个教师未付账目</p>
                            </div>
                          </div>
                        </div>
                      </Link>

                    </div>
                    <br/>
                    <br/>
                  </div>;

    return (
      <div>
        <Header />
        <div className="bg-light-grey page-min-height">
          <Breadcrumb action="dashboard" />
          {content}
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    identity: state.identity,
    auth: state.auth,
    books: state.booksData.count,
    courses: state.coursesData.count,
    teachers: state.teachersData.count,
    students: state.studentsData.count,
    paychecks: state.paycheckData.count,
    loading: state.status.loading
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    setLoadingStatus: (status) => {
      dispatch(setLoadingStatus(status))
    },
    logout: () => {
      dispatch(logout())
    },
    adminInit: () => {
      let token = localStorage.getItem("jwtToken");
      if(!token || token === "") {//if there is no token, dont bother
        return;
      }
      dispatch(adminInit(token))
    }
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);