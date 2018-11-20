import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

import '../../css/App.css';
import { FlashMessage } from '../../components/FlashMessage';
import Background from '../../images/bg.png';
import { signup } from "../../actions/users_actions.js";
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.emailInput = React.createRef();
    this.wechatInput = React.createRef();
    this.phoneInput = React.createRef();
    this.identitySelect = React.createRef();
    this.passwordInput = React.createRef();
    this.passwordConInput = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    M.updateTextFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    let identityValue = this.identitySelect.current.state.value;
    const user = {
      email: this.emailInput.current.value,
      wechat: this.wechatInput.current.value,
      phone: this.phoneInput.current.value,
      identity: identityValue,
      password: this.passwordInput.current.value,
      passwordCon: this.passwordConInput.current.value
    }
    this.props.signup(user);
  }

  render() {
    const bg_style = {
      minHeight: "700px",
      background: "url(" + Background + ") no-repeat", 
      backgroundSize: "cover"
    };

    var defaultValue = this.props.identity === "TEACHER" ? "teacher" : "student";
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    return (
      <div>
        <Header />
        <div className="" style={bg_style}>
          <div className="container">
            <br/>
            <br/>
            <div className="row no-margin">
              <div className="col s12 m8 offset-m2">
                <div className="card r-box-shadow">
                  <div className="card-content">
                    <div className="row">
                      <div className="col s12 m10 offset-m1">
                        <h4 className="center">注册</h4>
                        <br/>
                        <Formik
                          initialValues={{ identity: defaultValue, email: '', wechat: '', phone: '', password: '', passwordCon: '' }}
                          onSubmit={(values, { setSubmitting }) => {
                            this.props.signup(values);
                          }}
                          validationSchema={Yup.object().shape({
                            identity: Yup.string().required('请选择你的身份'),
                            email: Yup.string().email('邮箱格式不正确').required('邮箱不能为空'),
                            wechat: Yup.string().required('请输入微信号'),
                            phone: Yup.string().matches(phoneRegExp, '电话号码格式不正确').min(7, '电话号码长度至少为7位').required('请输入电话号码'),
                            password: Yup.string().min(6, '密码长度至少为6位').required('密码不能为空'),
                            passwordCon: Yup.string().oneOf([Yup.ref('password')], '请输入相同的密码').required('请确认密码')
                          })}
                        >
                          {props => {
                            const {
                              values,
                              touched,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              setFieldValue,
                              setFieldTouched
                            } = props;
                            return (
                              <form onSubmit={handleSubmit}>
                                {errors.identity && touched.identity && <FlashMessage props={{status: "error", msg: errors.identity}} />}
                                {errors.email && touched.email && <FlashMessage props={{status: "error", msg: errors.email}} />}
                                {errors.wechat && touched.wechat && <FlashMessage props={{status: "error", msg: errors.wechat}} />}
                                {errors.phone && touched.phone && <FlashMessage props={{status: "error", msg: errors.phone}} />}
                                {errors.password && touched.password && <FlashMessage props={{status: "error", msg: errors.password}} />}
                                {errors.passwordCon && touched.passwordCon && <FlashMessage props={{status: "error", msg: errors.passwordCon}} />}

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <select 
                                      name="identity"
                                      value={values.identity}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    >
                                      <option value='student'>家长/学生</option>
                                      <option value='teacher'>教师</option>
                                    </select>
                                    <label>我的身份</label>
                                  </div>
                                </div>

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <input 
                                      type="email" 
                                      name="email" 
                                      id="email" 
                                      autoComplete="true"
                                      placeholder="me@lighters.com"
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
                                      type="text" 
                                      name="wechat" 
                                      id="wechat"
                                      placeholder="微信号"
                                      autoComplete="false" 
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="validate"
                                    />
                                    <label htmlFor="wechat">微信 <span className="required">*</span></label>
                                  </div>
                                </div>

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <input 
                                      type="text" 
                                      name="phone"
                                      id="phone"
                                      autoComplete="false" 
                                      placeholder="18764334567"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="validate"
                                    />
                                    <label htmlFor="phone">电话 <span className="required">*</span></label>
                                  </div>
                                </div>

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <input 
                                      type="password" 
                                      name="password" 
                                      id="password" 
                                      autoComplete="true" 
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="validate"
                                    />
                                    <label htmlFor="password">密码 <span className="required">*</span></label>
                                  </div>
                                </div>

                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <input 
                                      type="password" 
                                      name="passwordCon" 
                                      id="passwordCon" 
                                      autoComplete="true" 
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="validate"
                                    />
                                    <label htmlFor="passwordCon">确认密码 <span className="required">*</span></label>
                                  </div>
                                </div>

                                <br/>
                                <div className="row no-margin">
                                  <div className="input-field col m12 s12">
                                    <button type="submit" className="btn cyan">注册</button>
                                  </div>
                                </div>

                              </form>
                            );
                          }}
                        </Formik>
                        <br/>
                        <p>点击 “注册” 即表示您同意并愿意遵守Lighters绘说英语 <span><u>用户协议</u></span> 和 <span><u>隐私政策</u></span>。</p>
                        <br/>
                        <div className="center"> 
                          <Link to="/login" style={{color: "#03BBD3", fontSize: "20px"}}>登录已有的账号</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
          </div>

        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    identity: state.identity,
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (user) => {
      dispatch(signup(user))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);