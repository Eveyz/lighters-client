import React from 'react'
import { connect } from 'react-redux'

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

const StudentProfile = (props) => {
  return(
    <div>
      <Header />
      <Footer />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    student: state.auth.identityData
  }
}

export default connect(mapStateToProps, null)(StudentProfile)