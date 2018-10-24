import React from 'react';
import { connect } from 'react-redux';
import { Row, Input } from 'react-materialize';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

import '../../css/App.css';
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
                        <form onSubmit={this.handleSubmit}>

                          <div className="input-field">
                            <select defaultValue={defaultValue} ref={this.identitySelect}>
                              <option value='student'>家长/学生</option>
                              <option value='teacher'>教师</option>
                            </select>
                            <label>我的身份</label>
                          </div>

                          <div className="input-field">
                            <input 
                              type="email" 
                              name="email" 
                              id="email" 
                              autoComplete="true" 
                              ref={this.emailInput}
                            />
                            <label htmlFor="email">邮箱 <span className="required">*</span></label>
                          </div>

                          <div className="input-field">
                            <input 
                              type="text" 
                              name="wechat" 
                              id="wechat" 
                              autoComplete="false" 
                              ref={this.wechatInput}
                            />
                            <label htmlFor="wechat">微信 <span className="required">*</span></label>
                          </div>

                          <div className="input-field">
                            <input 
                              type="text" 
                              name="phone" 
                              id="phone" 
                              autoComplete="false" 
                              ref={this.phoneInput}
                            />
                            <label htmlFor="phone">电话 <span className="required">*</span></label>
                          </div>

                          <div className="input-field">
                            <input 
                              type="password" 
                              name="password" 
                              id="password" 
                              autoComplete="true" 
                              ref={this.passwordInput}
                            />
                            <label htmlFor="password">密码 <span className="required">*</span></label>
                          </div>

                          <div className="input-field">
                            <input 
                              type="password" 
                              name="passwordCon" 
                              id="passwordCon" 
                              autoComplete="true" 
                              ref={this.passwordConInput}
                            />
                            <label htmlFor="passwordCon">确认密码 <span className="required">*</span></label>
                          </div>

                          <br/>
                          <div className="actions">
                            <button className="btn cyan">注册</button>
                          </div>
                        </form>
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
    signup: (user) => {
      dispatch(signup(user))
    }
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);