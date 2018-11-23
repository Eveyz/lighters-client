import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getFullDate } from '../../ultis';
import FormPick from '../forms/FormPick';
import FormInput from '../forms/FormInput';
import FormTextarea from '../forms/FormTextarea';
import BooksForReport from './BooksForReport';
import AudiosFileList from './AudiosFileList';
import { addReport, updateReport } from '../../actions/reports_actions';

class ReportForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false
    }

    this.courseDate = React.createRef();
    this.startTime = React.createRef();
    this.endTime = React.createRef();
    this.focusTime = React.createRef();
    this.comment = React.createRef();
    this.homework = React.createRef();
    this.audioLinks = React.createRef();
    this.audioFile = React.createRef();

    this.getInputData = this.getInputData.bind(this);
    this.checkFileBeforeUpload = this.checkFileBeforeUpload.bind(this);
    this.submitForm = this.handleSubmit.bind(this);
  }

  getInputData(field_name, val) {
    if(this.courseDate.current.value && this.startTime.current.value && this.endTime.current.value && this.focusTime.current.value && this.comment.current.value && this.homework.current.value) {
      // only reset state => True if form is not valid
      if(!this.state.valid) this.setState({valid: true});
    } else {
      // only reset state => False if form is valid
      if(this.state.valid) this.setState({valid: false});
    }
  }

  checkFileBeforeUpload() {
    const audio_files = Array.from(this.audioFile.current.files);
    audio_files.forEach(file => {
      const ext = file.name.split(".").pop();
      if(ext !== 'mp3' && ext !== 'wav') {
        window.Materialize.toast('请选择音频文件', 5000);
        if(this.state.valid) this.setState({valid: false});
      } else {
        if(!this.state.valid) this.setState({valid: true});
      }
    });
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
      start_time: this.startTime.current.value,
      end_time: this.endTime.current.value,
      focus: this.focusTime.current.value,
      tutor_comment: this.comment.current.value,
      homework: this.homework.current.value,
      external_link: this.audioLinks.current.value,
      audios: audio_files,
      audios_files: this.props.action === "EDIT" ? this.props.report.audios_files : [],
      review_books: this.props.reviewBooks,
      new_books: this.props.newBooks,
      future_books: this.props.futureBooks,
      removedFiles: this.props.removedFiles,
    }
    let path = "/teachers/" + this.props.user_id + "/course_manager";

    if(this.props.action === "NEW") {
      this.props.addReport(report, path);
    } else if(this.props.action === "EDIT") {
      this.props.updateReport(this.props.report._id, report, path);
    }
  }

  render() {
    let disabled = !this.state.valid;
    let buttonColor = disabled ? "#bdc3c7" : "#2ecc71";

    let buttonStyle = {padding: "15px 0px 15px 0px", borderRadius: "15px", backgroundColor: buttonColor, border: "none", cursor: "pointer"}
    let action = this.props.action;
    let path = action === "EDIT" ? "/teachers/" + this.props.user_id + "/reports" : "/teachers/" + this.props.user_id + "/course_manager";
    let audiosFileList = this.props.action === "EDIT" ? <AudiosFileList files={this.props.files} /> : "";

    return(
      <div>
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

        <div className="row no-margin">
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

        <BooksForReport action={action} />
        <br/>

        <div className="row no-margin">
          <FormTextarea
            classes="input-field col m12 s12"
            name="comment"
            label="课程评价"
            required={true}
            errorMsg="请填写课程评价"
            refFromParent={this.comment}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.tutor_comment : ""}
          />
        </div>

        <div className="row no-margin">
          <FormTextarea
            classes="input-field col m12 s12"
            name="homework"
            label="课后作业"
            required={true}
            errorMsg="请填写课后作业"
            refFromParent={this.homework}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.homework : ""}
          />
        </div>

        <br/>
        {audiosFileList}

        <div className="row no-margin" style={{marginBottom: "0px"}}>
          <FormTextarea
            classes="input-field col m12 s12"
            name="audio_links"
            label="课程音频网盘链接"
            required={false}
            errorMsg=""
            refFromParent={this.audioLinks}
            getInputData={this.getInputData}
            action={action}
            value={action === "EDIT" ? this.props.report.external_link : ""}
          />
        </div>
        <div className="row no-margin">
          <div className="input-field col m12 s12 no-margin">
            <p>或者上传</p>
          </div>
        </div>
        <div className="row no-margin">
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
              disabled={disabled} 
              className="col m12 s12" 
              style={buttonStyle}
              onClick={this.submitForm}
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
    addReport: (report, path) => dispatch(addReport(report, path)),
    updateReport: (report_id, report, path) => dispatch(updateReport(report_id, report, path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);