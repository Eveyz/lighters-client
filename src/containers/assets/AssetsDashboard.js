import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/layouts/Header';
import LevelandSalary from './LevelSalary';
import TeacherSalary from './TeacherSalary';

class AssetsDashboard extends React.Component {
  render() {
    let content = ""
    let active = ""
    let path = ""
    let name = ""
    if(this.props.location.pathname.includes("level_salaries")) {
      content = <LevelandSalary />
      active = "level_salaries"
      path = "/assets/level_salaries"
      name = "等级工资设定"
    } else if (this.props.location.pathname.includes("teacher_salaries")) {
      content = <TeacherSalary />
      active = "teacher_salaries"
      path = "/assets/teacher_salaries"
      name = "教师工资管理"
    } else if (this.props.location.pathname.includes("transactions")) {
      content = ""
      active = "transactions"
      path = "/assets/transactions"
      name = "公司资金明细"
    }

    return (
      <div>
        <Header />
        <div className="custom-container">
          <br/>
          <div className="row no-margin">
            <Link to={`/users/admin/dashboard`} className="airbnb-font bold grey-text">管理员面板</Link> > <Link to={path} className="airbnb-font bold"><u>{name}</u></Link>
          </div>
          <br/>
          <div className="left-fixed-bar">
            <ul className="no-margin">
              <li><Link to="/assets/level_salaries" className={`${active === "level_salaries" ? "active" : ""} airbnb-font bold`}>等级工资设定</Link></li>
              <li><Link to="/assets/teacher_salaries" className={`${active === "teacher_salaries" ? "active" : ""} airbnb-font bold`}>教师工资管理</Link></li>
              <li><Link to="/assets/transactions" className={`${active === "transactions" ? "active" : ""} airbnb-font bold`}>公司资金明细</Link></li>
              <li><Link to="/assets" className="airbnb-font bold">缴费提醒</Link></li>
            </ul>
          </div>
          <div className="main-content-wrapper">
            <div className="main-content">
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AssetsDashboard;