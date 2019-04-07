import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import M from 'materialize-css';

import { getFullDate } from '../../ultis';
import FormPick from '../forms/FormPick';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import TableForm from './TableForm';
// import BooksForReport from './BooksForReport';
import Working from '../../components/Working';
import AudiosFileList from './AudiosFileList';

import { addReport, updateReport } from '../../actions/reports_actions';
import { setLoadingStatus } from '../../actions/status_actions';

class ReportForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      situation: this.props.action === "NEW" ? 1 : this.props.report.situation === "取消" ? -1 : 1,
      comment: this.props.action === "NEW" ? "" : (this.props.report.comment || ""),
      homework: this.props.action === "NEW" ? "" : (this.props.report.homework || ""),
      course_content: this.props.action === "NEW" ? [{}] : this.props.report.course_content
    }

    this.courseDate = React.createRef();
    this.startTime = React.createRef();
    this.endTime = React.createRef();
    this.focusTime = React.createRef();
    this.audioLinks = React.createRef();
    this.audioFile = React.createRef();
    this.situation = React.createRef();
    this.reason = React.createRef();

    this.getInputData = this.getInputData.bind(this);
    this.checkFileBeforeUpload = this.checkFileBeforeUpload.bind(this);
    this.getTableFormData = this.getTableFormData.bind(this);
    this.submitForm = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.setLoadingStatus(false)
  }

  getInputData(field_name, val) {
    // check if course is cancelled
    if(field_name === "comment") this.setState({comment: val})
    if(field_name === "homework") this.setState({homework: val})
    if(this.situation.current.value === "取消") {
      this.setState({situation: -1})
      if(this.reason.current.value) {
        this.setState({valid: true})
      } else {
        this.setState({valid: false})
      }
    } else {
      this.setState({valid: false, situation: 1})
      // course not cancelled, keep going here
      if(this.courseDate.current.value && this.startTime.current.value && this.endTime.current.value && this.focusTime.current.value && this.state.comment && this.state.homework && this.situation.current.value) {
        // only reset state => True if form is not valid
        if(!this.state.valid) this.setState({valid: true});
      } else {
        // only reset state => False if form is valid
        if(this.state.valid) this.setState({valid: false});
      }
    }
  }

  checkFileBeforeUpload() {
    const audio_files = Array.from(this.audioFile.current.files);
    audio_files.forEach(file => {
      const ext = file.name.split(".").pop();
      const exts = ['mp3', 'wav']
      if(exts.includes(ext)) {
        if(!this.state.valid) this.setState({valid: true});
      } else {
        window.Materialize.toast('请选择音频文件', 5000);
        if(this.state.valid) this.setState({valid: false});
      }
    });
  }

  getTableFormData(tableFormData) {
    // console.log("table form data: ", tableFormData)
    this.setState({
      course_content: tableFormData
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const audio_files = Array.from(this.audioFile.current.files);
    let _course_date = this.courseDate.current.value
    if(_course_date.length < 10) {
      _course_date = getFullDate(_course_date)
    }
    let report = {
      teacher_id: this.props.teacher_id,
      course_id: this.props.course_id,
      student_id: this.props.student_id,
      course_date: _course_date,
      situation: this.situation.current.value,
      start_time: this.startTime.current.value,
      end_time: this.endTime.current.value,
      focus: this.focusTime.current.value,
      course_content: this.state.course_content,
      tutor_comment: this.state.comment,
      homework: this.state.homework,
      external_link: this.audioLinks.current.value,
      audios: audio_files,
      audios_files: this.props.action === "EDIT" ? this.props.report.audios_files : [],
      review_books: this.props.reviewBooks,
      new_books: this.props.newBooks,
      future_books: this.props.futureBooks,
      removedFiles: this.props.removedFiles,
    }
    if(this.state.situation < 0) {
      report = {
        teacher_id: this.props.teacher_id,
        course_id: this.props.course_id,
        student_id: this.props.student_id,
        course_date: _course_date,
        situation: this.situation.current.value,
        reason: this.reason.current.value
      }
    }
    let path = "/teachers/" + this.props.user_id + "/course_manager";

    this.props.setLoadingStatus(true)

    if(this.props.action === "NEW") {
      this.props.addReport(report, path)
    } else if(this.props.action === "EDIT") {
      this.props.updateReport(this.props.report._id, report, path)
    }
  }

  render() {
    // let disabled = !this.state.valid;
    let visiblity = this.state.situation < 0 ? "display-none" : "display-block";
    let notVisiblity = this.state.situation < 0 ? "display-block" : "display-none";

    let buttonColor = this.props.isLoading ? "#bdc3c7" : "#2ecc71";
    let buttonStyle = {padding: "15px 0px 15px 0px", borderRadius: "15px", backgroundColor: buttonColor, border: "none", cursor: "pointer"}

    let action = this.props.action;

    let path = action === "EDIT" ? "/teachers/" + this.props.user_id + "/reports" : "/teachers/" + this.props.user_id + "/course_manager";

    let audiosFileList = this.props.action === "EDIT" ? <AudiosFileList files={this.props.files} /> : "";

    const workingInfo = this.props.isLoading ? <Working msg={`正在提交反馈表, 请耐心等候 :) ${this.props.englishname}老师辛苦了, 先去放松一下吧!`} /> : null

    const disabled = this.props.isLoading ? true : false

    return(
      <div>
        {workingInfo}
        <div className="row no-margin">
          <FormPick
            classes="input-field col m12 s12"
            type="date"
            name="course_date"
            label="上课日期"
            required={true}
            errorMsg="请选择上课日期"
            refFromParent={this.courseDate}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.course_date : ""}
          />
        </div>

        <div className="row no-margin">
          <FormSelect
            classes="input-field col m12 s12"
            name="situation"
            label="上课情况"
            required={true}
            errorMsg="请选择上课情况"
            refFromParent={this.situation}
            getInputData={this.getInputData}
            action={action}
            prompt="请选择上课情况"
            options={["正常上课", "学员开课前2小时内才请假(0.5个课时费)", "学员上课时间后才请假或无故缺课(1个课时费)", "学员迟到(不必补全课时, 可按时下课, 1个课时费)", "老师迟到早退10分钟以内(需免费于当堂或下堂课补全课时才可得1个课时费, 但会影响薪资晋级)", "老师无故迟到10分钟以上20分钟以内并且课程依旧进行(0.5个课时费)", "老师无故迟到并且取消课程(0个课时费, 需免费补课一节)", "免费补课(0个课时费)", "试课(0个课时费)", "代课(1个课时费)", "小组课单个学员首次请假(学员付0.5课时费观看上课录屏, 老师照旧获1课时费)", "小组课单个学员非首次请假(学员付1课时费观看上课录屏, 老师获1课时费)"]}
            value={action === "EDIT" ? this.props.report.situation : ""}
          />
        </div>

        <div className={"row no-margin " + notVisiblity}>
          <FormInput
            classes="input-field col m12 s12"
            name="reason"
            inputType="text"
            label="取消原因"
            required={true}
            errorMsg="取消原因"
            refFromParent={this.reason}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.reason : ""}
          />
        </div>

        <div className={"row no-margin " + visiblity}>
          <FormPick
            classes="input-field col m6 s12"
            type="time"
            name="start_time"
            label="开始时间"
            required={true}
            errorMsg="请选择开始时间"
            refFromParent={this.startTime}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.start_time : ""}
          />
          <FormPick
            classes="input-field col m6 s12"
            type="time"
            name="end_time"
            label="结束时间"
            required={true}
            errorMsg="请选择结束时间"
            refFromParent={this.endTime}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.end_time : ""}
          />
        </div>

        <div className={"row no-margin " + visiblity}>
          <FormInput
            classes="input-field col m12 s12"
            name="focus_time"
            inputType="number"
            label="学生专注时间(分钟)"
            required={true}
            errorMsg="请填写学生专注的时间"
            refFromParent={this.focusTime}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.focus : ""}
          />
        </div>

        {/* <div className={"row no-margin " + visiblity}>
          <BooksForReport action={action} />
        </div>
        <br/> */}

        <div className={"row no-margin no-autoinit " + visiblity}>
          <div className="row no-margin">
            <div className="input-field col m12 no-margin">
              <h5 className="orange-text">上课内容</h5>
            </div>
          </div>
          <blockquote className="blockquote-style no-margin">
            <p>此行填写格式为：</p>
            <br/>
            <p>Lighters绘说英语阅读资源类型有：主流分级绘本, 名家绘本, 自然拼读, 科普读物, 动画视频, 写作教程, (初高中)章节小说, 学生自读</p>
          </blockquote>
          <TableForm 
            action={action} 
            value={action === "EDIT" ? this.state.course_content : [{}] }
            saveValue={this.getTableFormData}
          />
          {/* <FormTextarea
            classes="input-field col m12 s12"
            name="course_content"
            label="上课内容"
            required={true}
            errorMsg="请填写上课内容"
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.course_content : ""}
          /> */}
          <br/>
        </div>

        <div className={"row no-margin no-autoinit " + visiblity}>
          <div className="row no-margin">
            <div className="input-field col m12 no-margin">
              <h5 className="orange-text">上课反馈</h5>
            </div>
          </div>
          <blockquote className="blockquote-style no-margin">
            <p>反馈内容主要涉及这几个方面：</p>
            <p><b>听</b> （上课对英语的听力反应，对音频视频的理解）</p>
            <p><b>说</b> （发音、自然拼读能力、英语对话口语能力）</p>
            <p><b>读</b> （朗读语音语调、role play、猜词推理能力）</p>
            <p><b>写</b> （表达、描述、议论、逻辑语言组织等）</p>
            <p><b>综合英语能力</b> （词汇句型掌握情况, 语法等）</p>
            <p>【基本技能】</p>
            <p>+ </p>
            <p>【扩展技能】</p>
            <p>想象力、记忆力、理解力、总结复述能力、知识面、分析思考评判能力、批判性思维、创新性思维、知识运用能力、上课专注力配合等</p>
            <br/>
            <p>不用面面俱到，可选择最关键点进行课堂总结与学生学习情况反馈</p>
          </blockquote>
          <FormTextarea
            classes="input-field col m12 s12"
            name="comment"
            label="上课反馈"
            required={true}
            errorMsg="请填写上课反馈"
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.tutor_comment : ""}
          />
        </div>

        <div className={"row no-margin no-autoinit " + visiblity}>
          <div className="row no-margin">
            <div className="input-field col m12 no-margin">
              <h5 className="orange-text">课后任务</h5>
            </div>
          </div>
          <blockquote className="blockquote-style no-margin">
            <p>在此布置课下作业：主要提醒每日听音频 (精听+泛听)、复习 (精读+泛读)、朗读模仿、并打卡录音；创意性的作业设计能更大地激发学生的学习热情；请多设计task-based, inquiry-based, research-based, project-based 等能激发孩子学习动力的趣味性作业任务。</p>
            <p>也可在此与家长进行正式交流，提出家长配合需求与建议</p>
          </blockquote>
          <FormTextarea
            classes="input-field col m12 s12"
            name="homework"
            label="课后任务"
            required={true}
            errorMsg="请填写课后任务"
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.homework : ""}
          />
        </div>

        <br/>
        <div className={"row no-margin " + visiblity}>
          {audiosFileList}
        </div>

        <div className={"row no-margin " + visiblity} style={{marginBottom: "0px"}}>
          <FormInput
            classes="input-field col m12 s12"
            name="audio_links"
            inputType="text"
            label="课程音频网盘链接"
            required={false}
            errorMsg=""
            refFromParent={this.audioLinks}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.external_link : ""}
          />
        </div>
        <div className={"row no-margin " + visiblity}>
          <div className="input-field col m12 s12 no-margin">
            <p>或者上传</p>
          </div>
        </div>
        <div className={"row no-margin " + visiblity}>
          <div className="file-field input-field col m12 s12">
            <div className="btn cyan">
              <span>上课录音文件</span>
              <input 
                type="file" 
                multiple 
                ref={this.audioFile}
                onChange={this.checkFileBeforeUpload}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>

        <div className="row no-margin">
          <div className="input-field col m12 s12">
            <button  
              className="col m12 s12"
              disabled={disabled}
              onClick={this.submitForm}
              style={buttonStyle}
            >
              <span style={{color: "white", fontSize: "20px"}}><b>提交</b></span>
            </button>
          </div>
        </div>

        <div className="row no-margin">
          <div className="input-field col m12 s12">
            <Link 
              className="col m12 s12 white r-box-shadow" 
              to={path}
              style={
                {padding: "11px 0px 11px 0px", borderRadius: "15px", border: "none", cursor: "pointer"}
              }
            >
              <span className="center" style={{color: "black", fontSize: "20px"}}><b>返回</b></span>
            </Link>
          </div>
        </div>

      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {  
  return {
    user_id: state.auth.user.userTokenData.id,
    englishname: state.auth.identityData.englishname,
    isLoading: state.status.loading,
    selectBooks: state.selectBooks.books,
    reviewBooks: state.reviewBooks.books,
    newBooks: state.newBooks.books,
    futureBooks: state.futureBooks.books,
    report: state.reportsData.currentReport,
    files: state.reportsData.currentReport.audios_files,
    removedFiles: state.reportsData.removedFiles
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoadingStatus: (status) => {
      dispatch(setLoadingStatus(status))
    },
    addReport: (report, path) => dispatch(addReport(report, path)),
    updateReport: (report_id, report, path) => dispatch(updateReport(report_id, report, path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);