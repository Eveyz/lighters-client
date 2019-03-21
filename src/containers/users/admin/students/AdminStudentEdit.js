import { connect } from 'react-redux';

import React from 'react';
import Header from '../../../../components/layouts/Header';
import Footer from '../../../../components/layouts/Footer';
import M from 'materialize-css';

import AdminStudentNewWithFormik from './AdminStudentNewWithFormik';
import Loading from '../../../../components/Loading';

import { setLoadingStatus } from '../../../../actions/status_actions';
import { getStudentData } from '../../../../actions/students_actions';

class AdminStudentEdit extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.setLoadingStatus(true)
  }

  componentDidUpdate() {
    M.updateTextFields()
  }

  componentDidMount() {
    this.props.getStudentData(this.props.match.params._id)
    M.updateTextFields()
  }

  render() {
    
    if(this.props.isLoading) {
      return <Loading />
    }

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
    student: state.studentsData.currentStudent,
    isLoading: state.status.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoadingStatus: (status) => {
      dispatch(setLoadingStatus(status))
    },
    getStudentData: (id) => dispatch(getStudentData(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStudentEdit);