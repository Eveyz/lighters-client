import React from 'react';
import {connect} from 'react-redux';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import PathNavigator from '../../components/layouts/PathNavigator';
import ReportList from './ReportList';
import Loading from '../../components/Loading';

class AllReports extends React.Component {

  render() {
    const content = this.props.isLoading ? <Loading /> :
                    <div className="container">
                      <br />
                      <div className="row">
                        <div className="col m12">
                          <h5><b>学生: {this.props.student.englishname}</b></h5>
                        </div>
                      </div>

                      <ReportList />
                    </div>

    return(
      <div>
        <Header />
        <PathNavigator 
          path={"/teachers/" + this.props.user_id + "/course_manager"} 
          content={"所有课程反馈表"} 
        />
        {content}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    student: state.studentsData.currentStudent,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllReports);