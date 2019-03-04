import { connect } from 'react-redux';

import React from 'react';
import Header from '../../../../components/layouts/Header';
import Footer from '../../../../components/layouts/Footer';
import M from 'materialize-css';

import AdminTeacherNewWithFormik from './AdminTeacherNewWithFormik';

import { getTeacherData } from '../../../../actions/teachers_actions';

class AdminTeacherEdit extends React.Component {
  componentWillMount() {
    this.props.getTeacherData(this.props.match.params._id)
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
                    <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>编辑教师</h5>
                    <AdminTeacherNewWithFormik 
                      teacher={this.props.teacher} 
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
  // this.props.search
  return {
    teacher: state.teachersData.currentTeacher
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTeacherData: (id) => dispatch(getTeacherData(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTeacherEdit);