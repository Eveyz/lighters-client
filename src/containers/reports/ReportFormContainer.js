import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import PathNavigator from '../../components/layouts/PathNavigator';
import ReportForm from './ReportForm';

class ReportFormContainer extends React.Component {
  render = () => {
    let action = this.props.match.path.includes('edit_report') ? "EDIT" : "NEW";

    let path = action === "NEW" ? "/teachers/" + this.props.user_id + "/course_manager" : "/teachers/" + this.props.user_id + "/reports";

    return(
      <div>
        <Header />
        <PathNavigator 
          path={path} 
          content={"填写新的课程反馈表"} 
        />
        <div className="container">
          <div>
            <div className="card r-box-shadow">
              <div className="card-content" style={{padding: "50px"}}>
                <div className="row no-margin">
                  <div className="input-field col m12 s12">
                    <span className="card-title black-text"><b>课程基本信息</b></span>
                    <p><span className="orange-text">上课学员:</span> {this.props.student.englishname}</p>
                    <p><span className="orange-text">上课老师:</span> {this.props.teacher.lastname + this.props.teacher.firstname}</p>
                    <p><span className="orange-text">课程名称:</span> {this.props.course.name}</p>
                    <br />
                  </div>
                </div>

                <ReportForm 
                  action={action}
                  teacher_id={this.props.teacher._id}
                  course_id={this.props.course._id}
                  student_id={this.props.student._id} 
                />
                
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.userTokenData.id,
    student: state.studentsData.currentStudent,
    teacher: state.auth.identityData,
    course: state.coursesData.currentCourse
  }
}

export default connect(mapStateToProps, null)(ReportFormContainer);