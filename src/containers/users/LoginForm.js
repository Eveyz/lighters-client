import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

import '../../css/App.css';
import Background from '../../images/bg.png';
import { login } from "../../actions/users_actions.js";
import Header from '../../components/layouts/Header';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid:  false
    }
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.checkboxInput = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    M.updateTextFields();
    M.AutoInit();
  }

  login(user) {
    this.props.login(user);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.emailInput.current.value,
      password: this.passwordInput.current.value,
      // checkbox: this.checkboxInput.current.state.checked
    }
    this.props.login(user);
  }

  render() {
    const bg_style = {
      minHeight: "700px",
      background: "url(" + Background + ") no-repeat", 
      backgroundSize: "cover"
    };

    return (
      <div>
        <Header />
        <div className="" style={bg_style}>
          <div className="container">
            <br/>
            <br/>
            <div className="row no-margin">
              <div className="col s12 m8 offset-m2">
                <div className="card">
                  <div className="card-content">
                    <div className="row">
                      <div className="col s12 m10 offset-m1">
                        <h4 className="center">登录</h4>
                        <br/>
                        <form onSubmit={this.handleSubmit}>
                          <div className="input-field">
                            <input 
                              type="email" 
                              name="email" 
                              id="email" 
                              autoComplete="true" 
                              placeholder="example@email.com"
                              ref={this.emailInput}
                            />
                            <label htmlFor="email">邮箱 <span className="required">*</span></label>
                          </div>

                          <div className="input-field">
                            <input 
                              type="password" 
                              name="password" 
                              id="password" 
                              autoComplete="true" 
                              ref={this.passwordInput}
                            />
                            <label htmlFor="email">密码 <span className="required">*</span></label>
                          </div>

                          <div>
                            <div className="input-field">
                              <input 
                                type="checkbox" 
                                className="filled-in"
                                id="remember_me"
                                ref={this.checkboxInput}
                              ></input>
                              <label htmlFor="remember_me">记住登录</label>
                            </div>
                          </div>

                          <br/>
                          <div className="actions">
                            <button className="btn">登录</button>
                          </div>
                        </form>
                        <br/>
                        <br/>
                        <Link to="/signup">注册</Link>
                        <br/>
                        <Link to="/signup">忘记密码</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    login: state.login
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    login: (user) => {
      dispatch(login(user))
    }
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);