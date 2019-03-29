import React from 'react';

import { tableFormRatio } from '../../ultis'

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
    let inputValue = this.cellContent.current.value.trim()
    if(inputValue) {
      this.setState({
        mode: "READ",
        cellValue: inputValue
      })
      this.props.saveValue([this.props.idx, this.props.ky, inputValue])
    } else {
      this.setState({mode: "READ"})
    }
  }

  render() {
    let inputForm = <div style={{width: tableFormRatio[this.props.ky]}}>
                      <input
                        type="text"
                        className="cell-input browser-default"
                        defaultValue={this.props.value}
                        ref={this.cellContent}
                        autoFocus
                        onBlur={this.cancelEdit}
                      ></input>
                    </div>
    
    if(this.state.mode === "EDIT") {
      return inputForm;
    }

    return(
      <div style={{width: tableFormRatio[this.props.ky]}} className="clickable hover-highlight valign-wrapper" onClick={this.edit} ><span>{this.props.value}</span></div>
    )
  }
}

export default TableCell;