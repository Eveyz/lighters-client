import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CLASS_LEVEL_RANK } from '../../ultis';

import TableFilter from '../../components/layouts/TableFilter'
import EntryInputForm from './EntryInputForm';
import Loading from '../../components/Loading';
import { setLoadingStatus } from '../../actions/status_actions';
import { addLevelSalary, updateLevelSalary, deleteLevelSalary } from '../../actions/level_salary_actions';

class LevelandSalary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      action: "NEW",
      entry: {},
      entries: this.props.entries || []
    }

    this.filterItems = this.filterItems.bind(this)
  }

  componentWillMount() {
    this.props.setLoadingStatus(true)
  }

  componentDidMount() {
    this.props.setLoadingStatus(false)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.entries !== nextProps.entries) {
      this.setState(nextProps)
    }
  }

  filterItems(entries) {
    this.setState({
      entries: entries
    })
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
    this.setState({entry: {}, show: !this.state.show, action: "NEW", entries: this.props.entries})
  }

  deleteEntry = (entry_id) => {
    this.props.deleteEntry(entry_id)
  }

  render() {
    const { entries } = this.state

    if(this.props.isLoading) {
      return <Loading />
    }

    let showInput = this.state.show ? <EntryInputForm action={this.state.action} entry={this.state.entry} onSubmit={this.onSubmit} cancel={this.onSubmit} /> : ""
    let btn = this.state.show ? "" : <button className="btn" onClick={this.toggleShow}><i className="material-icons left">add</i>新建条目</button>

    let entriesList = ""
    let entriesTable = ""
    if(this.props.entries.length > 0 && !this.state.show) {
      var _options = {
        "level": new Set(), 
        "rate": new Set(), 
        "course_level": new Set(),
        "type": new Set()
      }
      this.props.entries.forEach(entry => {
        _options["level"].add(entry["level"])
        _options["rate"].add(entry["rate"])
        _options["type"].add(entry["type"])
        _options["course_level"].add(entry["course_level"])
      })
      entriesList = entries.map((entry, idx) => {
        return <tr key={idx}>
                  <td>{entry.level}</td>
                  <td>{entry.rate}</td>
                  <td>{entry.course_level}</td>
                  <td>{entry.type}</td>
                  <td>
                    <i className="material-icons clickable left cyan-text" onClick={this.toggleEdit(entry)}>edit</i>
                  </td>
                  <td>
                    <i className="material-icons clickable left red-text" onClick={() => { if (window.confirm('确定要删除此条目?')) this.deleteEntry(entry._id)}}>delete</i>
                  </td>
               </tr>
      })
      const _fields = {
        "level": "教师等级", 
        "rate": "工资", 
        "course_level": "课程等级",
        "type": "课程类型"
      }
      entriesTable =  <React.Fragment>
                        <TableFilter fields={_fields} options={_options} items={this.props.entries} filterItems={this.filterItems} />
                        <table className="highlight">
                          <thead>
                            <tr>
                              <th>教师等级</th>
                              <th>工资(元/课时/学生)</th>
                              <th>课程等级</th>
                              <th>课程类型</th>
                              <th>编辑</th>
                              <th>删除</th>
                            </tr>
                          </thead>

                          <tbody>
                            {entriesList}
                          </tbody>
                        </table>
                      </React.Fragment>
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