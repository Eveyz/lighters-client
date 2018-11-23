import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';

import SearchTeacher from './SearchTeacher';
import TeacherSalaryDetail from './TeacherSalaryDetail';
import PaginationContainer from '../PaginationContainer';
import { setMode } from '../../actions/mode_action';
import MonthlyReport from './MongthlyReport';

class TeacherSalary extends React.Component {
  constructor(props) {
    super(props)

    this.props.setMode("BROWSE")
    this.month = ""
    this.reports = []
  }

  state = {
    show: false,
    action: "NEW",
    teacher: {}
  }

  levelToSalary = (level) => {
    let ls
    ls = this.props.levelSalaries.find(ele => {
      return ele.level === `${level}级`
    })
    return ls ? ls.rate : 0
  }

  changeMode = (e) => {
    let m = e.target.checked ? "SEARCH" : "BROWSE"
    this.props.setMode(m)
  }

  back = (mode) => {
    this.props.setMode(mode)
  }

  viewMonthReports = (month, reports) => {
    this.month = month
    this.reports = reports
  }

  render() {
    let teacherContent = <SearchTeacher />
    let _teacher = {
      name: this.props.teacher.lastname + this.props.teacher.firstname,
      level: this.props.teacher.level,
      rate: this.levelToSalary(this.props.teacher.level)
    }
    if(this.props.mode === "BROWSE") {
      teacherContent = <PaginationContainer 
                        itemsPerPage={5}
                        data={this.props.teachers} content={"TEACHERS"} readOnly={false}
                      />;
    } else if (this.props.mode === "VIEW_TEACHER") {
      teacherContent = <TeacherSalaryDetail 
                          teacher={_teacher} 
                          back={this.back}
                          viewMonthReports={this.viewMonthReports}
                        />
    } else if (this.props.mode === "VIEW_MONTHLY") {
      teacherContent = <MonthlyReport 
                          teacher={_teacher}
                          reports={this.reports} 
                          month={this.month} 
                          back={this.back} 
                        />
    }

    let change = this.props.mode === ("BROWSE" || "SEARCH") ? 
                  <div className="switch">
                    <label>
                      浏览
                      <input type="checkbox" onClick={this.changeMode} />
                      <span className="lever"></span>
                      搜索
                    </label>
                  </div> : ""

    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
            <h5 className="airbnb-font bold">教师工资管理</h5>
            <hr/>
            {change}
            <br/>
            {teacherContent}
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    teacher: state.teachersData.currentTeacher,
    teachers: state.teachersData.teachers,
    mode: state.mode.value,
    levelSalaries: state.levelSalary.levelSalaries.map(ls => {
      return { level: ls.level, rate: ls.rate }
    }),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setMode: (mode) => {
      dispatch(setMode(mode))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSalary);