import React from 'react';
import { Row, Col, Card } from 'react-materialize';
import M from 'materialize-css';

class EntryInputForm extends React.Component {
  constructor(props) {
    super(props)

    this.level = React.createRef();
    this.salary = React.createRef();

    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    M.updateTextFields();
  }

  handleCancel() {
    this.props.cancel();
  }

  handleSubmit() {
    let _level = this.level.current.value
    let _rate = this.salary.current.value
    if(!_level || !_rate) {
      window.Materialize.toast('等级或者工资不能为空', 1000);
    } else {
      let _entry = this.props.action === "NEW" ? 
      {
        level: _level,
        rate: _rate
      } 
      :
      {
        _id: this.props.entry._id,
        level: _level,
        rate: _rate
      } 
      this.props.onSubmit(_entry);
    }
  }

  render() {
    return(
      <div>
        <Row>
          <Col m={12} s={12}>
            <Card className='white no-margin' textClassName='black-text' title=''>
              <div className="row">
                <div className="input-field col s6">
                  <input 
                    defaultValue={this.props.entry.level} 
                    ref={this.level} 
                    id="level" 
                    type="text" 
                    className="validate" 
                  />
                  <label htmlFor="level">教师等级 <span className="required">*</span></label>
                </div>
                <div className="input-field col s6">
                  <input 
                    defaultValue={this.props.entry.rate} 
                    ref={this.salary} 
                    id="wage" 
                    type="number" 
                    className="validate" 
                  />
                  <label htmlFor="wage">工资每课时/人民币 <span className="required">*</span></label>
                </div>
              </div>
              <button className="btn" onClick={this.handleSubmit}>保存</button>
              <button className="btn white black-text right" onClick={this.handleCancel}>取消</button>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EntryInputForm;