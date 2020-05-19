import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import Loading from '../../components/Loading'

const ShowTeacher = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [teacher, setTeacher] = useState(null)

  useEffect(() => {
    axios.get(`/teachers/${props.match.params._id}`)
    .then((response) => {
        setTeacher(response.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Header />
      <Breadcrumb action="showTeacher" />
      {
        isLoading ?
        <Loading />
        :
        <div className="container page-min-height">
          <br />
          <div className="col s12 m12">
            <div className="card r-box-shadow">
              <div className="card-content">
                <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>教师信息</b></span>
                <h6>名字: {teacher.lastname}{teacher.firstname}</h6>
                <h6>英文名字: {teacher.englishname}</h6>
                <h6>级别: {teacher.level}级</h6>
                <h6>性别: {teacher.gender}</h6>
              </div>
            </div>
          </div>
          <Link to={`/admin/teachers/${teacher._id}/edit`} className="btn">编辑</Link>
        </div>
      }
      <Footer />
    </div>
  )
}

export default ShowTeacher

// class ShowTeacher extends React.Component {
//   componentWillMount() {
//     this.props.getTeacherData(this.props.match.params._id)
//   }

//   render() {
//     return(
//       <div>
//         <Header />
//         <Breadcrumb action="showTeacher" />
//         <div className="container page-min-height">
//           <br />
//           <div className="col s12 m12">
//             <div className="card r-box-shadow">
//               <div className="card-content">
//                 <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>教师信息</b></span>
//                 <h6>名字: { this.props.teacher.lastname}{this.props.teacher.firstname}</h6>
//                 <h6>英文名字: {this.props.teacher.englishname}</h6>
//                 <h6>级别: {this.props.teacher.level}级</h6>
//                 <h6>性别: {this.props.teacher.gender}</h6>
//               </div>
//             </div>
//           </div>
//           <Link to={`/admin/teachers/${this.props.teacher._id}/edit`} className="btn">编辑</Link>
//         </div>
//         <Footer />
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   // this.props.search
//   return {
//     teacher: state.teachersData.currentTeacher
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getTeacherData: (id) => dispatch(getTeacherData(id)),
//     updateTeacher: (id, field) => dispatch(updateTeacher(id, field))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ShowTeacher);
