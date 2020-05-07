import React, { useState, useContext } from 'react';
// import axios from 'axios'

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import PathNavigator from '../../components/layouts/PathNavigator';
import ReportList from './ReportList';
import Loading from '../../components/Loading';
import { AppContext } from '../../AppContext';

const AllReports = props => {

  const [state, setState] = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)

  const content = isLoading ? <Loading /> :
                    <div className="container">
                      <br />
                      <div className="row">
                        <div className="col m12">
                          <h5><b>学生: {state.current_student.englishname}</b></h5>
                        </div>
                      </div>

                      <ReportList />
                    </div>

  return(
    <div>
      <Header />
      <PathNavigator 
        path={"/teachers/" + props.match.params._id + "/course_manager"} 
        content={"所有课程反馈表"} 
      />
      {content}
      <Footer />
    </div>
  )
}

export default AllReports

// class AllReports extends React.Component {

//   render() {
//     const content = this.props.isLoading ? <Loading /> :
//                     <div className="container">
//                       <br />
//                       <div className="row">
//                         <div className="col m12">
//                           <h5><b>学生: {this.props.student.englishname}</b></h5>
//                         </div>
//                       </div>

//                       <ReportList />
//                     </div>

//     return(
//       <div>
//         <Header />
//         <PathNavigator 
//           path={"/teachers/" + this.props.user_id + "/course_manager"} 
//           content={"所有课程反馈表"} 
//         />
//         {content}
//         <Footer />
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user_id: state.auth.user.userTokenData.id,
//     student: state.studentsData.currentStudent,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AllReports);