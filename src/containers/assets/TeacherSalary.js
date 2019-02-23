import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';

import SearchTeacher from './SearchTeacher';
import TeacherSalaryDetail from './TeacherSalaryDetail';
import PaginationContainer from '../PaginationContainer';
import MonthlyReport from './MongthlyReport';
import PaycheckList from './PaycheckList';
import { setMode } from '../../actions/mode_action';
import { getPaychecks } from '../../actions/paychecks_actions';
import { getActiveTeachers } from '../../actions/teachers_actions';

class TeacherSalary extends React.Component {
  constructor(props) {
    super(props)

    this.props.setMode("BROWSE")
    this.paycheck = {reports: []}
  }

  componentWillMount() {
    this.props.getPaychecks(`?paid=${false}`)
    this.props.getActiveTeachers()
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
    this.props.getPaychecks(`?paid=${false}`)
    this.props.setMode(mode)
  }

  viewPaycheck = (paycheck) => {
    this.paycheck = paycheck
  }

  render() {
    let teacherContent = <SearchTeacher />
    let _teacher = {
      _id: this.props.teacher._id,
      name: this.props.teacher.lastname + this.props.teacher.firstname,
      level: this.props.teacher.level,
      rate: this.props.teacher.rate || this.levelToSalary(this.props.teacher.level)
    }

    switch(this.props.mode) {
      case "BROWSE":
        // 老师分页浏览
        teacherContent = <PaginationContainer 
                            itemsPerPage={5}
                            data={this.props.teachers} content={"TEACHERS"} readOnly={false}
                          />;
        break;
      case "VIEW_TEACHER":
        // 查看老师的工资
        teacherContent = <TeacherSalaryDetail 
                          teacher={_teacher} 
                          back={this.back}
                          viewPaycheck={this.viewPaycheck}
                        />
        break;
      case "VIEW_MONTHLY":
        // 结算的页面
        teacherContent = <MonthlyReport 
                            teacher={_teacher}
                            paycheck={this.paycheck}
                            back={this.back}
                          />
        break;
    };

    let switchWidget = this.props.mode === "BROWSE" || "SEARCH" ? 
                  <div className="switch">
                    <label>
                      浏览教师
                      <input type="checkbox" onClick={this.switchWidgetMode} />
                      <span className="lever"></span>
                      搜索教师
                    </label>
                  </div> : ""

    let unpaidChecks = this.props.mode === ("BROWSE" || "SEARCH") ? 
                  <div>
                    <h6 className="airbnb-font bold red-text">未结算的工资单</h6>
                    <hr/>
                    <PaycheckList paychecks={this.props.paychecks.filter((paycheck, idx) => {
                      return !paycheck.paid
                    })} viewPaycheck={this.viewPaycheck} />
                  </div> : ""
    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
            {unpaidChecks}
            <br/>
            <h6 className="airbnb-font bold">查看教师工资单</h6>
            <hr/>
            {switchWidget}
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
    paychecks: state.paycheckData.paychecks,
    mode: state.mode.value,
    levelSalaries: state.levelSalary.levelSalaries.map(ls => {
      return { level: ls.level, rate: ls.rate, type: ls.type }
    }),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setMode: (mode) => {
      dispatch(setMode(mode))
    },
    getPaychecks: (query) => {
      dispatch(getPaychecks(query))
    },
    getActiveTeachers: () => {
      dispatch(getActiveTeachers())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSalary);