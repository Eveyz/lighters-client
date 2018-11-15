import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/layouts/Header';
import TuiCalendar from '../TuiCalendar';

class StudentDashboard extends React.Component {
  render() {
    console.log(this.props);
    return(
      <div style={{height: "100%"}}>
        <Header />
        <div className="student-dashboard">
          <div className="left-fixed-bar">
            <br/>
            <h5 className="cyan-text" style={{marginLeft: "30px"}}>学生Dashboard</h5>
            <ul className="left-bar-menu">
              <li className="active"><Link to={`/students/${this.props.student._id}/dashboard`}><i className="material-icons">home</i><span>主页</span></Link></li>
              <li><Link to={`/students/${this.props.student._id}/courses`}><i className="material-icons">event_note</i><span>课程</span></Link></li>
              <li><Link to={`/students/${this.props.student._id}/reports`}><i className="material-icons">description</i><span>课程回馈表</span></Link></li>
              <li><Link to={`/students/${this.props.student._id}/books`}><i className="material-icons">book</i><span>绘本</span></Link></li>
            </ul>
          </div>
          <div className="main-content-wrapper">
            <br/>
            <div className="main-content">
              <div className="card white r-box-shadow">
                <div className="card-content">
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