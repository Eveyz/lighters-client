import React, { useContext } from 'react';
import history from '../../history'
import { AppContext } from '../../AppContext';


const TeacherCourse = props => {
  
  const [state, setState] = useContext(AppContext)
  
  const clickCourse = (course) => e => {
    let path = `/teachers/${props.match.params._id}/course_manager`
    setState({
      auth: state.auth,
      current_user: state.current_user,
      current_course: course,
      current_teacher: state.current_teacher,
      current_student: state.current_student,
      current_report: state.current_report
    })
    history.push(path)
  }

  const image = props.course.theme ? props.course.theme : "WorldStudies-title.jpg"

  return(
    <a href="" onClick={(e) => clickCourse(props.course)}>
      <div className="col s12 m6">
        <div className="card r-box-shadow">
          <div className="card-image">
            <img src={require(`../../images/classroom/${image}`)} alt="course_background" />
            <span className="card-title text-overflow" style={{fontWeight: "400"}}><b>{ props.course.name }</b></span>
          </div>
          <div className="card-content">
            <p className="black-text">课程级别: { props.course.level }</p>
            <p className="black-text">学生数量: { props.course.students.length }</p>
            <p className="black-text">绘本数量: { props.course.books.length }</p>
          </div>
        </div>
      </div>
    </a>
  )
}

export default TeacherCourse

// class TeacherCourse extends React.Component {
//   constructor(props) {
//     super(props)

//     this.clickCourse = this.clickCourse.bind(this)
//   }

//   clickCourse = (e) => {
//     e.preventDefault();
//     let path = "/teachers/" + this.props.user_id + "/course_manager";
//     this.props.selectCourse(this.props.course, path);
//   }

//   render() {
//     const image = this.props.course.theme ? this.props.course.theme : "WorldStudies-title.jpg"

//     return(
//       <a href="" onClick={this.clickCourse}>
//         <div className="col s12 m6">
//           <div className="card r-box-shadow">
//             <div className="card-image">
//               <img src={require(`../../images/classroom/${image}`)} alt="course_background" />
//               <span className="card-title text-overflow" style={{fontWeight: "400"}}><b>{ this.props.course.name }</b></span>
//             </div>
//             <div className="card-content">
//               <p className="black-text">课程级别: { this.props.course.level }</p>
//               <p className="black-text">学生数量: { this.props.course.students.length }</p>
//               <p className="black-text">绘本数量: { this.props.course.books.length }</p>
//             </div>
//           </div>
//         </div>
//       </a>
//     )
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectCourse: (course, path) => {
//       dispatch(selectCourse(course, path))
//     }
//   }
// }

// export default connect(null, mapDispatchToProps)(TeacherCourse);