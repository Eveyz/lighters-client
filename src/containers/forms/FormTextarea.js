import React from 'react';
import M from 'materialize-css';
import '../../css/App.css';

import QuillTextEditor from '../TextEditor/Quill';

class FormTextarea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // M.AutoInit();
    M.updateTextFields();
  }

  handleChange = (name, val) => {
    if(!val || val.length === 0) {
      this.setState({hasError: true});
    } else {
      if(this.state.hasError) {
        this.setState({hasError: false});
      }
    }
    this.props.getInputData(name, val);
  }

  render() {
    let hideOrNot = this.state.hasError ? "red-text" : "red-text hide";
    let required = this.props.required ? <span className="required">*</span> : "";
    let msg = this.props.required ? 
              <span className={hideOrNot}>
                <i className="tiny material-icons">report_problem</i> {this.props.errorMsg}
              </span> :
              "";
              
    let defaultValue = ""
    if(this.props.action === "EDIT") defaultValue = this.props.value

    return(
      <div className={this.props.classes}>
        <p className="label-style airbnb-font">{this.props.label} {required}</p>
        <QuillTextEditor
          name={this.props.name}
          id={this.props.name}
          value={defaultValue}
          onChange={this.handleChange}
          onBlur={this.handleChange}
        />
        {msg}
      </div>
    )
  }
}

export default FormTextarea;