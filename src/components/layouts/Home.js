import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize'
import '../../css/mainpages.css';
import '../../css/App.css';

import Header from './Header';
import Footer from './Footer';
import TeachersCards from '../mainpages/teachersCards';
import { setStudent, setTeacher } from '../../actions/users_actions';

import book1 from '../../images/b1.png'
import book2 from '../../images/b2.png'
import book3 from '../../images/b3.png'
import book4 from '../../images/b4.jpg'
// import book5 from '../../images/b5.jpeg'
import uphill from '../../images/hillup.svg'

class Home extends Component {
  constructor(props) {
    super(props);

    this.teacherSignup = this.teacherSignup.bind(this);
    this.studentSignup = this.studentSignup.bind(this);
  }

  teacherSignup() {
    this.props.teacherSignup();
  }

  studentSignup() {
    this.props.studentSignup();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="top-wrapper">
        <div>
          <div className="slider-wrapper">
            <div className="main-img-wrapper"></div>
            <div className="main-img-wrapper"></div>
            <div className="main-img-wrapper"></div>
          </div>
        </div>
        <div className="mainpage-content-wrapper">
          <Header action="mainpage" />
          <div className="row above-img" style={{marginTop: "120px"}}>
            <div className="col offset-m6 m6">
              <h2 className="center-align white-text">读故事，学英语</h2>
            </div>
          </div>
          <div className="row above-img">
            <div className="col offset-m6 m6">
              <div className="transparent-btn center-align" onClick={this.studentSignup}>申请试课</div>
            </div>
          </div>
          <div className="row above-img">
            <div className="col offset-m6 m6">
              <div className="transparent-btn center-align" onClick={this.teacherSignup}>申请教职</div>
            </div>
          </div>
        </div>
        <br/>
        <div>
          <br/>
          <br/>
          <h4 className="center banner-font">Lighters绘说英语</h4>
          <div className="container">
            <Row>
              <Col m={6} className="center advantages">
                <p>欧美英语硕士博士</p>
                <p>外语教育研究专家</p>
                <p>一线经验中教名师</p>
                <p>专业TESOL高级外教</p>
                <p>985/211英语专业八级</p>
                <p>严苛标准招聘岗前培训</p>
                <p>定期集体备课批课教研</p>
              </Col>
              <Col m={6} className="center advantages">
                <p>灵活的时间地点</p>
                <p>在家登录上课软件即可上课</p>
                <p>双方约定一周2-3次上课时间</p>
                <p>灵活的上课模式</p>
                <p>一对一私人课 (40分钟)</p>
                <p>一对多小组课 (45分钟)</p>
              </Col>
            </Row>
          </div>

          <h4 className="center banner-font">原版教材</h4>
          <div className="container center" style={{backgroundImage: `${uphill}`}}>
            <Row>
              <img style={{width: "225px"}} src={book1} alt="Yvonne冰冰老师"></img>
              <img style={{width: "225px"}} src={book2} alt="Yvonne冰冰老师"></img>
              <img style={{width: "225px"}} src={book4} alt="Yvonne冰冰老师"></img>
              <img style={{width: "225px"}} src={book3} alt="Yvonne冰冰老师"></img>
            </Row>
          </div>
        </div>
        <TeachersCards />
        <div className="gradient-bg card-padding">
          <h4 className="center white-text">准备好了嘛?</h4>
          <h5 className="center white-text">点击申请试课, 让您的孩子加入我们的绘本英语学习之旅吧.</h5>
          <br/>
          <div onClick={this.studentSignup} className="center large-btn">申请试课</div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    teacherSignup: () => dispatch(setTeacher()),
    studentSignup: () => dispatch(setStudent())
  };
}

export default connect(null, mapDispatchToProps)(Home);