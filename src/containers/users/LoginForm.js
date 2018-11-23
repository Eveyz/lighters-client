import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { Formik } from 'formik';
import * as Yup from 'yup';

import '../../css/App.css';
// import Background from '../../images/bg.png';
import { login } from "../../actions/users_actions.js";
// import Header from '../../components/layouts/Header';
import { FlashMessage } from '../../components/FlashMessage';

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
      // minHeight: "700px",
      // background: "url(" + Background + ") no-repeat", 
      // backgroundSize: "cover"
      backgroundImage: "linear-gradient(to right top, #ffc107, #ffb700, #ffad00, #ffa200, #ff9800)",
      minHeight: "100vh"
    };

    return (
      <div>
        <div style={bg_style}>
          <br/>
          <Link to="/"><h3 className="center white-text no-margin">Lighters</h3></Link>
          <div className="container">
            <br/>
            <div className="row no-margin">
              <div className="col s12 m8 offset-m2">
                <div className="card r-box-shadow">
                  <div className="card-content">
                    <div className="row">
                      <div className="col s12 m10 offset-m1">
                        <h4 className="center">登录</h4>
                        <br/>
                        <Formik
                          initialValues={{ email: '', password: '' }}
                          onSubmit={(values, { setSubmitting }) => {
                            this.props.login(values);
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string()
                              .email('邮箱格式不正确')
                              .required('邮箱不能为空'),
                            password: Yup.string()
                              .min(6, '密码长度至少为6位')
                              .required('密码不能为空')
                          })}
                        >
                          {props => {
                            const {
                              touched,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                            } = props;
                            return (
                              <form onSubmit={handleSubmit}>
                                {errors.email && touched.email && <FlashMessage props={{status: "error", msg: errors.email}} />}
                                {errors.password && touched.password && <FlashMessage props={{status: "error", msg: errors.password}} />}

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <input 
                                      type="email" 
                                      name="email" 
                                      id="email" 
                                      placeholder="example@email.com"
                                      ref={this.emailInput}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="validate"
                                    />
                                    <label htmlFor="email">邮箱 <span className="required">*</span></label>
                                  </div>
                                </div>

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <input 
                                      type="password" 
                                      name="password" 
                                      id="password" 
                                      autoComplete="true" 
                                      ref={this.passwordInput}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="validate"
                                    />
                                    <label htmlFor="email">密码 <span className="required">*</span></label>
                                  </div>
                                </div>

                                <div className="row no-margin">
                                  <div className="col m12 s12">
                                    <input 
                                      type="checkbox" 
                                      name="remember"
                                      className="filled-in"
                                      id="remember_me"
                                      ref={this.checkboxInput}
                                    ></input>
                                    <label htmlFor="remember_me">记住登录</label>
                                  </div>
                                </div>
                                <br/>
                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <button type="submit" className="btn">登录</button>
                                  </div>
                                </div>

                              </form>
                            );
                          }}
                        </Formik>
                        
                        <div className="row no-margin">
                          <div className="input-field col m12 s12">
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

            <div className="page-bottom-nav center">
              <Link to="/" className="dot-after">关于Lighters</Link>
              <Link to="/terms" className="dot-after">服务条款</Link>
              <Link to="/help" className="dot-after">帮助</Link>
              <Link to="/jobs">加入我们</Link>
            </div>
            <br/>
            <br/>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    login: state.login,
    status: state.status
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => {
      dispatch(login(user))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);