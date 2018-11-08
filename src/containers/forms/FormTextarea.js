import React from 'react';
import M from 'materialize-css';
import '../../css/App.css';
import { EditorState } from 'draft-js'

class FormTextarea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    M.updateTextFields();
  }

  handleChange = (e) => {
    let val = e.target.value;
    if(!val) {
      this.setState({hasError: true});
    } else {
      if(this.state.hasError) {
        this.setState({hasError: false});
      }
    }
    this.props.getInputData(this.props.name, val);
  }

  render() {
    let hideOrNot = this.state.hasError ? "red-text" : "red-text hide";
    let required = this.props.required ? <span className="required">*</span> : "";
    let msg = this.props.required ? 
              <span className={hideOrNot}>
                <i className="tiny material-icons">report_problem</i> {this.props.errorMsg}
              </span> :
              "";
              
    let defaultValue = "";

    if(this.props.action === "EDIT") {
      defaultValue = this.props.value;
    }

    return(
      <div className={this.props.classes}>
        <textarea 
          id={this.props.name} 
          className="materialize-textarea"
          defaultValue={defaultValue}
          ref={this.props.refFromParent}
          onBlur={this.handleChange}
          autoComplete="off" 
          autoCorrect="off" 
          autoCapitalize="off" 
          spellCheck="false"
        ></textarea>
        
        <label htmlFor={this.props.name}>
          {this.props.label} {required}
        </label>
        {msg}
      </div>
    )
  }
}

export default FormTextarea;