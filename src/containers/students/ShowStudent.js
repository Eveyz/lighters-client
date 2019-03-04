import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';

import { getStudentData, updateStudent } from '../../actions/students_actions';

class ShowStudent extends React.Component {
  componentWillMount() {
    this.props.getStudentData(this.props.match.params._id)
  }

  render() {
    return(
      <div>
        <Header />
        <Breadcrumb action="showStudent" />
        <div className="container page-min-height">
          <br />
          <div className="col s12 m12">
            <div className="card r-box-shadow">
              <div className="card-content">
                <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>学生信息</b></span>
                <h6>名字: { this.props.student.lastname}{this.props.student.firstname}</h6>
                <h6>英文名字: {this.props.student.englishname}</h6>
                <h6>性别: {this.props.student.gender}</h6>
              </div>
            </div>
          </div>
          <Link to={`/admin/students/${this.props.student._id}/edit`} className="btn">编辑</Link>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    student: state.studentsData.currentStudent
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getStudentData: (id) => dispatch(getStudentData(id)),
    updateStudent: (id, field) => dispatch(updateStudent(id, field))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowStudent);