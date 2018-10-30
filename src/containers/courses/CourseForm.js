import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-materialize';
import M from 'materialize-css';

import '../../css/App.css';
import { addCourse, updateCourse } from "../../actions/courses_actions";
import Option from '../../components/Option';

class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.nameInput = React.createRef();
    this.levelInput = React.createRef();
    this.capacityInput = React.createRef();
    this.hoursInput = React.createRef();
    this.timeInput = React.createRef();
    this.teachersSelect = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  initMaterilize() {
    var timePicker = this.timeInput.current;
    var selectElem = this.teachersSelect.current;
    M.FormSelect.init(selectElem, {});
    M.Timepicker.init(timePicker, {});
    M.AutoInit();
    M.updateTextFields();
  }

  componentWillMount() {
    this.initMaterilize();
  }

  componentDidMount() {
    this.initMaterilize();
  }

  componentDidUpdate() {
    this.initMaterilize();
  }

  handleSubmit(e) {
    e.preventDefault();
    let courseID = this.props.currentCourse._id;
    const course = {
      name: this.nameInput.current.value,
      level: this.levelInput.current.value,
      capacity: this.capacityInput.current.value,
      course_hours: this.hoursInput.current.value,
      // timeInput: this.timeInput.current.value,
      teachers: [this.teachersSelect.current.value]
    };

    if(this.props.type === "ADD") {
      this.props.addCourse(course);
    } else if (this.props.type === "EDIT") {
      this.props.updateCourse(courseID, course);
    }
  }

  render() {
    let disabled = true;
    let defaultOption = <option value="default" disabled>目前没有老师可以选择</option>;
    if(this.props.teachers.length > 0) {
      disabled = false;
      defaultOption = <option value="default" disabled>选择教师</option>;
    }
    let options = this.props.teachers.map((teacher, index) => {
      return (
        <Option key={index} id={teacher._id} value={teacher.lastname + teacher.firstname} />
      );
    });

    let nameVal = "";
    let levelVal = "";
    let capacityVal = "";
    let coursehoursVal = "";
    let timeInputVal = "";
    let teacherVal = "default";
    if(this.props.type === "EDIT" && this.props.currentCourse !== {}) {
      nameVal = this.props.currentCourse.name;
      levelVal = this.props.currentCourse.level;
      capacityVal = this.props.currentCourse.capacity;
      coursehoursVal = this.props.currentCourse.course_hours;

      let defaultTeacher = this.props.currentCourse.teachers[0]
      teacherVal = defaultTeacher._id;
    }

    let selectEle = <div className="input-field col s12">
                      <select 
                        defaultValue={teacherVal} 
                        ref={this.teachersSelect} 
                        disabled={disabled}
                      >
                        {defaultOption}
                        {options}
                      </select>
                      <label>选择教师</label>
                    </div>

    return (
      <Row>
        <Col s={12} m={10} offset="m1">
          <br/>
          <div className="card">
            <div className="card-content" style={{padding: "50px"}}>
              <Row>
                <div className="col input-field s12">
                  <input type="text" defaultValue={nameVal} ref={this.nameInput} id="name" />
                  <label htmlFor="name">课程名称</label>
                </div>
              </Row>
              <Row>
                <div className="col input-field s12">
                  <input type="text" defaultValue={levelVal} ref={this.levelInput} id="level" />
                  <label htmlFor="level">课程评级</label>
                </div>
              </Row>
              <Row>
                <div className="col input-field s12">
                  <input type="number" defaultValue={capacityVal} ref={this.capacityInput} id="capacity" />
                  <label htmlFor="capacity">课程容量</label>
                </div>
              </Row>
              <Row>
                <div className="col input-field s12">
                  <input type="number" defaultValue={coursehoursVal} ref={this.hoursInput} id="hours" />
                  <label htmlFor="hours">课时</label>
                </div>
              </Row>
              <Row>
                <div className="col input-field s12">
                  <input type="text" defaultValue={timeInputVal} className="timepicker" ref={this.timeInput} id="timeInput" />
                  <label htmlFor="timeInput">课程时间</label>
                </div>
              </Row>
              <Row>
                {selectEle}
              </Row>
              <Button onClick={this.handleSubmit}>提交</Button>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  // this.props.search
  return {
    currentCourse: state.coursesData.currentCourse,
    courses: state.coursesData.courses,
    teachers: state.teachersData.teachers,
    students: state.studentsData.students
  };
}

// Any thing returned from this function will end up as props on the BookList component
const mapDispatchToProps = dispatch => {
  // Whenever search is called, the result should be passed to all reducers
  return {
    addCourse: (course) => {
      dispatch(addCourse(course))
    },
    updateCourse: (courseID, course) => {
      dispatch(updateCourse(courseID, course))
    }
  }; // this.props.doSearch will become the result of headSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseForm);