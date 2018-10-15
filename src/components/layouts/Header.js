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
    let links = "";
    if(this.props.auth.isAuthenticated) {
      if(this.props.auth.user.userTokenData.identity === "admin") {
        links = <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/users/admin/dashboard">管理员面板</Link></li>
                <li><a onClick={this.logout}>注销</a></li>
              </ul>
      } else if(this.props.identity === "teacher") {
        links = <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/teachers/me">我的主页</Link></li>
                <li><a onClick={this.logout}>注销</a></li>
              </ul>
      } else {
        links = <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/students/me">我的主页</Link></li>
                <li><a onClick={this.logout}>注销</a></li>
              </ul>
      }
    } else {
      links = <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/signup" onClick={this.setStudent}>申请免费试课</Link></li>
                <li><Link to="/login">登录</Link></li>
              </ul>
    }

    return (
      <nav className="amber">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Lighters</Link>
          {links}
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