import React, { useState, useEffect } from 'react';
import Header from '../../../../components/layouts/Header';
import Footer from '../../../../components/layouts/Footer';
import M from 'materialize-css';

import AdminTeacherNewForm from './AdminTeacherNewForm';
import Loading from '../../../../components/Loading';

import axios from 'axios';

const AdminTeacherEdit = props => {

  const [loading, setLoading] = useState(false)
  const [teacher, setTeacher] = useState(null)

  useEffect(() => {
    M.updateTextFields()
    setLoading(true)
    axios.get(`/teachers/${props.match.params._id}`)
    .then(res => {
      setLoading(false)
      setTeacher(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  if(loading) {
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
                  <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>编辑教师</h5>
                  <AdminTeacherNewForm 
                    teacher={teacher} 
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

export default AdminTeacherEdit

// class AdminTeacherEdit extends React.Component {

//   componentWillMount() {
//     this.props.setLoadingStatus(true)
//   }

//   componentDidUpdate() {
//     M.updateTextFields()
//   }

//   componentDidMount() {
//     this.props.getTeacherData(this.props.match.params._id)
//     M.updateTextFields()
//   }

//   render() {

//     if(this.props.isLoading) {
//       return <Loading />
//     }

//     return (
//       <div>
//         <Header />
//           <div className="container">
//             <br/>

//             <div className="row">
//               <div className="col s12 m10 offset-m1">
//                 <div className="card r-box-shadow">
//                   <div className="card-content" style={{padding: "50px"}}>
//                     <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>编辑教师</h5>
//                     <AdminTeacherNewWithFormik 
//                       teacher={this.props.teacher} 
//                       action="EDIT"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
          
//         <Footer />
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   // this.props.search
//   return {
//     teacher: state.teachersData.currentTeacher,
//     isLoading: state.status.loading
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status))
//     },
//     getTeacherData: (id) => dispatch(getTeacherData(id))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AdminTeacherEdit);