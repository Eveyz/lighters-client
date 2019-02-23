import React from 'react';

class TableCell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: "READ",
      cellValue: this.props.value || ''
    }
    this.cellContent = React.createRef()

    this.edit = this.edit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  edit() {
    this.setState({mode: "EDIT"})
  }

  cancelEdit() {
    let inputValue = this.cellContent.current.value
    this.setState({
      mode: "READ",
      cellValue: inputValue
    })
    this.props.saveValue([this.props.ky, inputValue])
  }

  render() {
    let inputForm = <td>
                      <textarea 
                        className="materialize-textarea"
                        defaultValue={this.props.value}
                        ref={this.cellContent}
                        autoFocus
                        onBlur={this.cancelEdit}
                      ></textarea>
                    </td>
    
    if(this.state.mode === "EDIT") {
      return inputForm;
    }

    return(
      <td className="clickable hover-highlight" onClick={this.edit} >{this.props.value}</td>
    )
  }
}

export default TableCell;