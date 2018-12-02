import React from 'react'
import { connect } from 'react-redux'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

const TeacherProfile = (props) => {
  return(
    <div>
      <Header />
      <Footer />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    teacher: state.auth.identityData
  }
}

export default connect(mapStateToProps, null)(TeacherProfile)