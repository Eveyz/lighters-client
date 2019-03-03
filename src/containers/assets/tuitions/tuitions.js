import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';

import TuitionInputForm from './TuitionInputForm';
import { getTuitions, addTuition, updateTuition, deleteTuition } from '../../../actions/tuitions_actions';
import { getStudents } from '../../../actions/students_actions'

class Tuitions extends React.Component {
  state = {
    show: false,
    action: "NEW",
    tuition: {}
  }

  componentWillMount() {
    this.props.getTuitions()
    this.props.getStudents("")
  }

  toggleEdit = (tuition) => e => {
    this.setState({show: true, action: "EDIT", tuition: tuition})
  }

  toggleShow = () => {
    this.setState({show: !this.state.show, action: "NEW"})
  }

  onSubmit = tuition => {
    if(tuition) {
      this.state.action === "NEW" ? this.props.addTuition(tuition) : this.props.updateTuition(tuition)
    }
    this.setState({tuition: {}, show: !this.state.show, action: "NEW"})
  }

  deleteTuition = (tuition_id) => {
    this.props.deleteTuition(tuition_id)
  }

  render() {
    let showInput = this.state.show ? <TuitionInputForm action={this.state.action} tuition={this.state.tuition} students={this.props.students} onSubmit={this.onSubmit} cancel={this.onSubmit} /> : ""
    let btn = this.state.show ? "" : <button className="btn" onClick={this.toggleShow}>新建条目</button>

    let tuitionsList = ""
    let tuitionsTable = ""
    if(this.props.tuitions.length > 0 && !this.state.show) {
      tuitionsList = this.props.tuitions.map((tuition, idx) => {
        return <tr key={idx}>
                  <td>{tuition.student_id.englishname}</td>
                  <td>{tuition.amount}</td>
                  <td>
                    <button className="btn cyan" onClick={this.toggleEdit(tuition)}>编辑</button>
                  </td>
                  <td>
                    <button className="btn red" onClick={() => { if (window.confirm('确定要删除此条目?')) this.deleteTuition(tuition._id)}}>删除</button>
                  </td>
               </tr>
      })
      tuitionsTable = <table className="highlight">
                        <thead>
                          <tr>
                            <th>学生</th>
                            <th>总额(元)</th>
                            <th>编辑</th>
                            <th>删除</th>
                          </tr>
                        </thead>

                        <tbody>
                          {tuitionsList}
                        </tbody>
                      </table>
    }

    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
            <h6 className="airbnb-font bold">学生学费</h6>
            <br/>
            {btn}
            {showInput}
            <br/>
            <br/>
            {tuitionsTable}
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tuitions: state.tuitionsData.tuitions,
    students: state.studentsData.students.map(student => {
      return {id: student._id, name: student.englishname, firstname: student.firstname, lastname: student.lastname}
    }),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTuitions: (query) => {
      dispatch(getTuitions(query))
    },
    getStudents: (query) => {
      dispatch(getStudents(query))
    },
    addTuition: (tuition) => {
      dispatch(addTuition(tuition))
    },
    updateTuition: (tuition) => {
      dispatch(updateTuition(tuition))
    },
    deleteTuition: (tuition_id) => {
      dispatch(deleteTuition(tuition_id))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tuitions);