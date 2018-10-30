import React from 'react';
import M from 'materialize-css';
import '../../css/App.css';

class FormInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    };
    this.inputValue = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  handleChange = (e) => {
    let val = e.target.value;
    if(!val) {
      this.setState({hasError: true});
    } else {
      if(this.state.hasError) {
        this.setState({hasError: false});
      }
      this.props.getInputData(this.props.name, val);
    }
  }

  render() {
    let hideOrNot = this.state.hasError ? "red-text" : "red-text hide";
    let required = this.props.required ? <span className="required">*</span> : "";
    let msg = this.props.required ? 
              <span className={hideOrNot}>
                <i className="tiny material-icons">report_problem</i> {this.props.errorMsg}
              </span> :
              "";

    return(
      <div className={this.props.classes}>
        <input 
          id={this.props.name} 
          type={this.props.inputType} 
          className="input-field-required validate" 
          ref={this.inputValue} 
          onChange={this.handleChange}
          onBlur={this.handleChange}
        />
        <label htmlFor={this.props.name}>
          {this.props.label} {required}
        </label>
        {msg}
      </div>
    )
  }
}

export default FormInput;