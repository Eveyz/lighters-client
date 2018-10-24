import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, setAdmin, setStudent, setTeacher } from "../../actions/users_actions.js";

class Header extends Component {
  constructor(props) {
    super(props);

    this.setStudent = this.setStudent.bind(this);
    this.logout = this.logout.bind(this);
  }

  setStudent() {
    this.props.setStudent();
  }

  logout() {
    this.props.logout();
  }

  render() {
    let path = "";
    let links = <li><a onClick={this.logout}>注销</a></li>;
    if(this.props.auth.isAuthenticated) {
      if(this.props.auth.user.userTokenData.identity === "admin") {
        path = <li><Link to="/users/admin/dashboard">管理员面板</Link></li>
      } else if(this.props.identity === "teacher") {
        path = <li><Link to="/teachers/me">我的主页</Link></li>;
      } else {
        path = <li><Link to="/students/me">我的主页</Link></li>;
      }
    } else {
      path = <li><Link to="/signup" className="waves-effect waves-light btn" style={{fontSize: "18px"}} onClick={this.setStudent}>申请免费试课</Link></li>;
      links = <li><Link to="/login">登录</Link></li>;
    }

    let classes = this.props.action === "mainpage" ? "transparent-nav non-box-shadow" : "amber";

    return (
      <nav className={classes}>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Lighters</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/advantage">成为老师</Link></li>
            <li><Link to="/advantage">课程体系</Link></li>
            <li><Link to="/login">上课流程</Link></li>
            <li><Link to="/login">关于我们</Link></li>
            {path}
            {links}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    identity: state.identity,
    auth: state.auth
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    logout: () => {
      dispatch(logout())
    },
    setAdmin: () => {dispatch(setAdmin())},
    setTeacher: () => {dispatch(setTeacher())},
    setStudent: () => {dispatch(setStudent())}
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);