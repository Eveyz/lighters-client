import React, { Component } from 'react';
import '../../css/App.css';
import M from 'materialize-css';

class StudentForm extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="col s12 m10 offset-m1">
            <div className="card r-box-shadow">
              <div className="card-content" style={{padding: "50px"}}>
                <span className="card-title">学员基本信息</span>
                <div className="row">
                  <div className="input-field col m6 s12">
                    <input id="lastname" type="text" className="input-field-required validate" ref={this.lastnameValue} />
                    <label htmlFor="lastname">姓 <span className="required">*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入姓</span>
                  </div>

                  <div className="input-field col m6 s12">
                    <input id="firstname" type="text" className="input-field-required validate" ref={this.firstnameValue} />
                    <label htmlFor="firstname">名 <span className="required">*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入名字</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <input id="englishname" type="text" className="input-field-required validate" ref={this.englishnameValue}/>
                    <label htmlFor="englishname">英文名(如果没有请留白) </label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <input id="age" type="number" className="input-field-required validate" ref={this.ageValue} />
                    <label htmlFor="age">年龄 <span className="required">*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入年龄</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <input id="student_birthday" type="text" className="datepicker input-field-required validate" ref={this.birthdayValue} />
                    <label htmlFor="student_birthday">出生日期 <span className="required">*</span></label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12 s12">
                    <select className="input-field-required" ref={this.genderValue}>
                      <option value="" disabled>选择性别</option>
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                    <label><b>性别</b> <span className="required">*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入性别</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <input id="city" type="text" className="input-field-required validate" ref={this.cityValue} />
                    <label htmlFor="city">所在城市 <span className="required">*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入所在城市</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <input id="schoolname" type="text" className="input-field-required validate" ref={this.schoolnameValue} />
                    <label htmlFor="schoolname">孩子所在学校的名称 <span className="required">*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入孩子所在学校的名称</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <p>孩子所在学校性质 <span className="required">*</span></p>
                    <p style={{marginTop: "8px"}}>
                      <input name="schoolstatus" type="radio" id="schoolstatus1" className="radio-field-required" />
                      <label htmlFor="schoolstatus1">国内公立</label>
                    </p>
                    <p>
                      <input name="schoolstatus" type="radio" id="schoolstatus2" className="radio-field-required" />
                      <label htmlFor="schoolstatus2">国内私立</label>
                    </p>
                    <p>
                      <input name="schoolstatus" type="radio" id="schoolstatus3" className="radio-field-required" />
                      <label htmlFor="schoolstatus3">国际学校</label>
                    </p>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请至少选择一项</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <input id="level" type="text" className="input-field-required validate" ref={this.levelValue} />
                    <label htmlFor="level">目前所在年级 (例如: 幼儿园中班， 小学三年级) <span className="required">*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入孩子目前所在年级</span>
                  </div>
                </div>
                
                <div className="row">
                  <div className="input-field col m12">
                    <input id="time" type="text" className="input-field-required validate" ref={this.timeValue} />
                    <label htmlFor="time">孩子学英语时长</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <p>您对孩子目前英语水平的自我评价 <span className="required">*</span></p>
                    <p style={{marginTop: "8px"}}>
                      <input name="estimate" type="radio" id="estimate1" className="estimate-other-radio radio-field-required" />
                      <label htmlFor="estimate1">优秀</label>
                    </p>
                    <p>
                      <input name="estimate" type="radio" id="estimate2" className="estimate-other-radio radio-field-required" />
                      <label htmlFor="estimate2">中上水平</label>
                    </p>
                    <p>
                      <input name="estimate" type="radio" id="estimate3" className="estimate-other-radio radio-field-required" />
                      <label htmlFor="estimate3">中等水平</label>
                    </p>
                    <p>
                      <input name="estimate" type="radio" id="estimate4" className="estimate-other-radio radio-field-required" />
                      <label htmlFor="estimate4">中下水平</label>
                    </p>
                    <p>
                      <input name="estimate" type="radio" id="estimate5" className="estimate-other-radio radio-field-required" />
                      <label htmlFor="estimate5">靠后</label>
                    </p>
                    <p>
                      <input name="estimate" type="radio" id="estimate6" className="estimate-other-radio radio-field-required" />
                      <label htmlFor="estimate6">其他, 请说明</label>
                      <input type="text" name="estimateOther" id="estimateOther" style={{display: "none"}} placeholder="请具体说明" className="text-input-other"></input>
                      <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请具体说明</span>
                    </p>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请至少选择一项</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <p>您对孩子英文学习的期望：可多选，依照重要程度来排列 (5星为您觉得最重要) (打分题 请填1-5数字打分）<span className="required">*</span></p>
                    <p style={{marginTop: "8px"}}>
                      <input type="checkbox" id="expectation1" ref={this.expectationValue} className="filled-in checkbox-field-required" />
                      <label htmlFor="expectation1">提高英语应试成绩</label>
                    </p>
                    <p>
                      <input type="checkbox" id="expectation2" ref={this.expectationValue} className="filled-in checkbox-field-required" />
                      <label htmlFor="expectation2">培养对英文及英语学习的兴趣</label>
                    </p>
                    <p>
                      <input type="checkbox" id="expectation3" ref={this.expectationValue} className="filled-in checkbox-field-required" />
                      <label htmlFor="expectation3">会听会说 (不是应试英语，哑巴英语)</label>
                    </p>
                    <p>
                      <input type="checkbox" id="expectation4" ref={this.expectationValue} className="filled-in checkbox-field-required" />
                      <label htmlFor="expectation4">会写</label>
                    </p>
                    <p>
                      <input type="checkbox" id="expectation5" ref={this.expectationValue} className="filled-in checkbox-field-required" />
                      <label htmlFor="expectation5">积累词汇量</label>
                    </p>
                    <p>
                      <input type="checkbox" id="expectation6" ref={this.expectationValue} className="filled-in checkbox-field-required" />
                      <label htmlFor="expectation6">养成(中英文)阅读习惯</label>
                    </p>
                    <p>
                      <input type="checkbox" id="expectation7" ref={this.expectationValue} className="filled-in checkbox-field-required" />
                      <label htmlFor="expectation7">了解西方文化</label>
                    </p>
                    <p>
                      <input type="checkbox" id="expectation8" ref={this.expectationValue} className="filled-in checkbox-field-required" />
                      <label htmlFor="expectation8">为出国学习做准备</label>
                    </p>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请至少选择一项</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <p>是否有每日阅读 (中英文均可) 的习惯 (包括亲子阅读) 并填写每日阅读时间 <span className="required">*</span></p>
                    <p style={{marginTop: "8px"}}>
                      <input name="dailyreading" type="radio" id="dailyreading1" className="daily-reading radio-field-required" />
                      <label htmlFor="dailyreading1">没有</label>
                    </p>
                    <p>
                      <input name="dailyreading" type="radio" id="dailyreading2" className="daily-reading radio-field-required" />
                      <label htmlFor="dailyreading2">有。每日阅读时间为</label>
                      <input type="text" name="dailyReading" id="dailyReading" style={{display: "none"}} placeholder="请具体说明" className="text-input-other"></input>
                      <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请具体说明</span>
                    </p>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请至少选择一项</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <p>如果没有每日阅读,那么目前的阅读状况是 <span className="required">*</span></p>
                    <p style={{marginTop: "8px"}}>
                      <input name="currentreadingstatus" type="radio" id="currentreadingstatus1" className="current-reading-status radio-field-required" />
                      <label htmlFor="currentreadingstatus1">几乎没有阅读习惯</label>
                    </p>
                    <p>
                      <input name="currentreadingstatus" type="radio" id="currentreadingstatus2" className="current-reading-status radio-field-required" />
                      <label htmlFor="currentreadingstatus2">偶尔读书</label>
                    </p>
                    <p>
                      <input name="currentreadingstatus" type="radio" id="currentreadingstatus3" className="current-reading-status radio-field-required" />
                      <label htmlFor="currentreadingstatus3">其他情况请说明</label>
                      <input type="text" name="currStatus" id="currStatus" style={{display: "none"}} placeholder="请具体说明" className="text-input-other"></input>
                      <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请具体说明</span>
                    </p>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请至少选择一项</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <p>家长本身英语水平 <span className="required">*</span></p>
                    <p style={{marginTop: "8px"}}>
                      <input name="penglishlevel" type="radio" id="penglishlevel1" className="radio-field-required" />
                      <label htmlFor="penglishlevel1">精通英语</label>
                    </p>
                    <p>
                      <input name="penglishlevel" type="radio" id="penglishlevel2" className="radio-field-required" />
                      <label htmlFor="penglishlevel2">辅助孩子英语学习和读书够用</label>
                    </p>
                    <p>
                      <input name="penglishlevel" type="radio" id="penglishlevel3" className="radio-field-required" />
                      <label htmlFor="penglishlevel3">出国旅游够用</label>
                    </p>
                    <p>
                      <input name="penglishlevel" type="radio" id="penglishlevel4" className="radio-field-required" />
                      <label htmlFor="penglishlevel4">几乎不懂</label>
                    </p>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请至少选择一项</span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col m12">
                    <p>自己对孩子的英语学习 <span className="required">*</span></p>
                    <p style={{marginTop: "8px"}}>
                      <input name="custody" type="radio" id="custody1" className="radio-field-required" />
                      <label htmlFor="custody1">可以做到每天监督，圆满配合老师的任务</label>
                    </p>
                    <p>
                      <input name="custody" type="radio" id="custody2" className="radio-field-required" />
                      <label htmlFor="custody2">可以下载资料，剩下的工作要靠孩子自己完成，自己并不能给其他的帮助</label>
                    </p>
                    <p>
                      <input name="custody" type="radio" id="custody3" className="radio-field-required" />
                      <label htmlFor="custody3">自己太忙了，没空管孩子学习</label>
                    </p>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请至少选择一项</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m10 offset-m1">
            <h6 className="center form-validation-msg" style={{padding: "20px 20px 20px 20px", backgroundColor: "#f39c12", color: "white"}}>请确认所有必填项目都有填写</h6>
            <div className="actions">
              <button onClick={this.handleSubmit} className='btn-large disabled submit-button'>提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentForm;