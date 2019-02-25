import React from 'react'
import axios from 'axios'

import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Loading from '../../components/Loading'

// import Logo from '../../images/logo12.svg';

class ViewReport extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      report: {},
      isLoading: true,
    }
  }
  
  componentDidMount() {
    axios.get(`${this.props.match.url}`).then((response) => {
      this.setState({
        report: response.data,
        isLoading: false
      })
    }).catch((err) => {
      console.log("Cannot get report")
    })
  }

  render() {
    const { report, isLoading } = this.state;
    
    if(isLoading) {
      return <Loading />
    }

    const tableRows = report.course_content.map((row, idx) => {
      return  <tr key={idx}>
                <td>{row.category}</td>
                <td>{row.serialName}</td>
                <td>{row.type}</td>
                <td>{row.ratio}</td>
                <td>{row.keywords}</td>
              </tr>
    })

    return (
      <div className="page-min-height">
        <Header />
        <div className="container">
          <div>
            <div className="card r-box-shadow">
              <div className="card-content" style={{padding: "50px"}}>
                <div className="row no-margin">
                  <div className="input-field col m12 s12">
                    {/* <img className="center" src={Logo} alt="lighters-logo" style={{width: "300px"}} /> */}
                    <span className="card-title black-text"><b>课程基本信息</b></span>
                    <p><span className="orange-text">上课学员:</span> {report.student_id.englishname}</p>
                    <p><span className="orange-text">上课老师:</span> {report.teacher_id.lastname + report.teacher_id.firstname}</p>
                    <p><span className="orange-text">课程名称:</span> {report.course_id.name}</p>
                    <p><span className="orange-text">课程时间:</span> {report.course_date} {report.start_time}-{report.end_time}</p>
                    <p><span className="orange-text">专注时长:</span> {report.focus}</p>
                    <br />
                    <h5 className="orange-text">上课内容</h5>
                    <table>
                      <thead>
                        <tr>
                          <th colSpan="1">读物类型</th>
                          <th colSpan="1">读物系列名/书名/章节</th>
                          <th colSpan="1">类别</th>
                          <th colSpan="1">翻译比例</th>
                          <th colSpan="1">Key Words/Patterns</th>
                          <th colSpan="1"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {tableRows}
                      </tbody>
                    </table>
                    <h5 className="orange-text">上课反馈</h5>
                    <div dangerouslySetInnerHTML={{__html: report.tutor_comment}} />
                    <h5 className="orange-text">课后任务</h5>
                    <div dangerouslySetInnerHTML={{__html: report.homework}} />
                    <br/>
                    <h4 className="center orange-text">希望你可以每天听音频, 跟读原文录音!</h4>
                    <h4 className="center orange-text">相信如此坚持下来, 肯定会见到美丽的彩虹!</h4>
                  </div>
                </div>
              </div>
            </div>
           </div> 
        </div>
        <Footer />
      </div>
    )
  }
}

export default ViewReport;