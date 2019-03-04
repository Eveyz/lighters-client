import { connect } from 'react-redux';

import React from 'react';
import Header from '../../../../components/layouts/Header';
import Footer from '../../../../components/layouts/Footer';
import M from 'materialize-css';

import AdminStudentNewWithFormik from './AdminStudentNewWithFormik';

import { getStudentData } from '../../../../actions/students_actions';

class AdminStudentEdit extends React.Component {
  componentWillMount() {
    this.props.getStudentData(this.props.match.params._id)
  }

  componentDidMount() {
    M.updateTextFields();
  }

  render() {
    return (
      <div>
        <Header />
          <div className="container">
            <br/>

            <div className="row">
              <div className="col s12 m10 offset-m1">
                <div className="card r-box-shadow">
                  <div className="card-content" style={{padding: "50px"}}>
                    <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>编辑学生</h5>
                    <AdminStudentNewWithFormik 
                      student={this.props.student} 
                      action="EDIT"
                    />
                  </div>
                </div>
              </div>
            </div>

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
    getStudentData: (id) => dispatch(getStudentData(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStudentEdit);