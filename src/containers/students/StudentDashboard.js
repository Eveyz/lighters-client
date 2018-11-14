import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import TuiCalendar from '../TuiCalendar';

class StudentDashboard extends React.Component {
  render() {
    return(
      <div style={{height: "100%"}}>
        <Header />
        <div className="student-dashboard">
          <div className="left-fixed-bar">
            <br/>
            <h5 className="cyan-text" style={{marginLeft: "30px"}}>学生Dashboard</h5>
            <ul className="left-bar-menu">
              <li className="active"><a><i className="small material-icons">home</i><span>主页</span></a></li>
              <li><a><i className="small material-icons">event_note</i><span>课程</span></a></li>
              <li><a><i className="small material-icons">description</i><span>课程回馈表</span></a></li>
              <li><a><i className="small material-icons">book</i><span>绘本</span></a></li>
            </ul>
          </div>
          <div className="main-content-wrapper">
            <br/>
            <div className="main-content">
              <div class="card white r-box-shadow">
                <div class="card-content">
                  <TuiCalendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    student: state.auth.identityData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);