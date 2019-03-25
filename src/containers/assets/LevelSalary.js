import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CLASS_LEVEL_RANK } from '../../ultis';

import EntryInputForm from './EntryInputForm';
import Loading from '../../components/Loading';
import { setLoadingStatus } from '../../actions/status_actions';
import { addLevelSalary, updateLevelSalary, deleteLevelSalary } from '../../actions/level_salary_actions';

class LevelandSalary extends React.Component {
  state = {
    show: false,
    action: "NEW",
    entry: {}
  }

  componentWillMount() {
    this.props.setLoadingStatus(true)
  }

  componentDidMount() {
    this.props.setLoadingStatus(false)
  }

  toggleEdit = (entry) => e => {
    this.setState({show: true, action: "EDIT", entry: entry})
  }

  toggleShow = () => {
    this.setState({show: !this.state.show, action: "NEW"})
  }

  onSubmit = entry => {
    if(entry) {
      this.state.action === "NEW" ? this.props.addEntry(entry) : this.props.updateEntry(entry)
    }
    this.setState({entry: {}, show: !this.state.show, action: "NEW"})
  }

  deleteEntry = (entry_id) => {
    this.props.deleteEntry(entry_id)
  }

  render() {
    if(this.props.isLoading) {
      return <Loading />
    }

    let showInput = this.state.show ? <EntryInputForm action={this.state.action} entry={this.state.entry} onSubmit={this.onSubmit} cancel={this.onSubmit} /> : ""
    let btn = this.state.show ? "" : <button className="btn" onClick={this.toggleShow}>新建条目</button>

    let entriesList = ""
    let entriesTable = ""
    if(this.props.entries.length > 0 && !this.state.show) {
      entriesList = this.props.entries.map((entry, idx) => {
        return <tr key={idx}>
                  <td>{entry.level}</td>
                  <td>{entry.rate}</td>
                  <td>{entry.type}</td>
                  <td>{entry.course_level}</td>
                  <td>
                    <button className="btn cyan" onClick={this.toggleEdit(entry)}>编辑</button>
                  </td>
                  <td>
                    <button className="btn red" onClick={() => { if (window.confirm('确定要删除此条目?')) this.deleteEntry(entry._id)}}>删除</button>
                  </td>
               </tr>
      })
      entriesTable = <table className="highlight">
                        <thead>
                          <tr>
                            <th>教师等级</th>
                            <th>工资(元/课时/学生)</th>
                            <th>课程类型</th>
                            <th>课程等级</th>
                            <th>编辑</th>
                            <th>删除</th>
                          </tr>
                        </thead>

                        <tbody>
                          {entriesList}
                        </tbody>
                      </table>
    }

    return(
      <Row>
        <Col m={12} s={12}>
          <Card className='white r-box-shadow no-margin' textClassName='black-text' title=''>
            <h6 className="airbnb-font bold">教师等级以及对应的工资</h6>
            <hr/>
            <br/>
            {btn}
            {showInput}
            <br/>
            <br/>
            {entriesTable}
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    isLoading: state.status.loading,
    entries: _(state.levelSalary.levelSalaries).chain().sortBy(function(ls) {
                return CLASS_LEVEL_RANK[ls.course_level];
            }).sortBy(function(ls) {
                return ls.type;
            }).sortBy(function(ls) {
              return parseInt(ls.level, 10);
            }).value()
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoadingStatus: (isLoading) => {
      dispatch(setLoadingStatus(isLoading))
    },
    addEntry: (entry) => {
      dispatch(addLevelSalary(entry))
    },
    updateEntry: (entry) => {
      dispatch(updateLevelSalary(entry))
    },
    deleteEntry: (entry_id) => {
      dispatch(deleteLevelSalary(entry_id))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelandSalary);