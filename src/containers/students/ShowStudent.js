import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'

import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Breadcrumb from '../../components/layouts/Breadcrumb'
import Loading from '../../components/Loading'

import { getStudentReportCredit, getLocalTime } from '../../ultis'

const ShowStudent = props => {

  const [isLoading, setIsLoading] = useState(true)
  const [student, setStudent] = useState({})

  useEffect(() => {
    axios.get(`/students/${props.match.params._id}`)
      .then(res => {
        setStudent(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if(isLoading) return <Loading />

  const sync = () => {
    setIsLoading(true)
    axios.post(`/students/${props.match.params._id}/recalculate`, {
      tuition_amount: remain
    }).then(res => {
        setStudent(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const cls = student.tuition_amount < 0 ? "red-text" : "green-text"

  var coursesHistory = <h5 className="center">没有上课记录</h5>
  
  var charges = []
  if(student.courses) {
    if(student.courses.length > 0) {
      var coursesList = []
      student.courses.forEach((course, index) => {
        _(course.reports).sortBy((report) => {
          return report.course_date
        }).value().forEach((report, idx) => {
          const charge = (getStudentReportCredit(report.situation) * course.course_rate).toFixed(2)
          charges.push(charge)
          coursesList.push(<tr key={`course-${index}-report-${idx}`}>
                              <td>{course.name}</td>
                              <td>{report.teacher_id.lastname + report.teacher_id.firstname}</td>
                              <td>{report.course_date}</td>
                              <td>{course.course_rate}</td>
                              <td>{report.situation}</td>
                              <td>{charge}</td>
                            </tr>)
        })
      })
    }

    coursesHistory = <table className="highlight">
                      <thead>
                        <tr>
                          <th>课程名称</th>
                          <th>教师</th>
                          <th>上课日期</th>
                          <th>课时费(元)</th>
                          <th>上课情况</th>
                          <th>实际收费(元)</th>
                        </tr>
                      </thead>

                      <tbody>
                        {coursesList}
                      </tbody>
                    </table>
  }

  var tuitionHistory = <h5 className="center">没有缴费记录</h5>
  
  var sum = 0
  if(student.tuitions) {
    if(student.tuitions.length > 0) {
      var tuiitionsList = student.tuitions.map((tuition, index) => {
        sum += tuition.amount
        return <tr key={index}>
                  <td>{tuition.amount.toFixed(2)}</td>
                  <td>{getLocalTime(tuition.created_at)}</td>
                </tr>
      })
      tuitionHistory = <table className="highlight">
                        <thead>
                          <tr>
                            <th>课时费(元)</th>
                            <th>时间</th>
                          </tr>
                        </thead>

                        <tbody>
                          {tuiitionsList}
                        </tbody>
                      </table>
    }
  }

  var remain = sum
  if(charges.length > 0) {
    charges.forEach(charge => {
      remain -= charge
    })
  }

  return (
    <div>
      <Header />
      <Breadcrumb action="showStudent" />
      <div className="container page-min-height">
        <br />
        <div className="col s12 m12">
          <div className="card r-box-shadow">
            <div className="card-content">
              <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>学生信息</b></span>
              <h6>名字: { student.lastname}{student.firstname}</h6>
              <h6>英文名字: {student.englishname}</h6>
              <h6>性别: {student.gender}</h6>
              <h6>课时费余额(元): <span className={cls}> {student.tuition_amount ? student.tuition_amount.toFixed(2) : 0}</span></h6>
              <Link to={`/admin/students/${student._id}/edit`} className="btn">编辑</Link>
              {
                student.tuition_amount === remain ?
                ""
                :
                <button style={{marginLeft: "10px"}} className="btn" type="button" onClick={sync}>重新计算学生学费</button>
              }
            </div>
          </div>
        </div>
        <div className="col s12 m12">
          <div className="card r-box-shadow">
            <div className="card-content">
              <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>缴费记录 (总额: <span className={cls}>{sum.toFixed(2)}</span>元)</b></span>
              {tuitionHistory}
            </div>
          </div>
        </div>
        <div className="col s12 m12">
          <div className="card r-box-shadow">
            <div className="card-content">
              <span className="card-title blue-grey-text" style={{fontWeight: "400"}}><b>上课记录</b></span>
              {coursesHistory}
              <h5>余额总计(元): <span className={ remain < 0 ? "red-text" : "green-text"}>{remain.toFixed(2)}</span></h5>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ShowStudent