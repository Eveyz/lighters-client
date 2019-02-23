import React from 'react';

import TableCell from './TableCell';

class TableRow extends React.Component {

  constructor(props) {
    super(props)

    this.deleteRow = this.deleteRow.bind(this)
    this.saveValue = this.saveValue.bind(this)
  }

  deleteRow() {
    this.props.deleteRow()
  }

  saveValue(value) {
    this.props.saveValue(value)
  }

  render() {
    // let tableCellList = ["category", "serialName", "type", "ratio", "keywords"].map((ele, idx) => {
    //   return <TableCell key={idx} ky="category" value={this.props.row[ele] || ''} saveValue={this.saveValue}/>
    // })
    if(this.props.row.category !== "") {
      return  <tr>
                <TableCell key={0} ky="category" value={this.props.row.category} saveValue={this.saveValue}/>
                <TableCell key={1} ky="serialName" value={this.props.row.serialName} saveValue={this.saveValue}/>
                <TableCell key={2} ky="type" value={this.props.row.type} saveValue={this.saveValue}/>
                <TableCell key={3} ky="ratio" value={this.props.row.ratio} saveValue={this.saveValue}/>
                <TableCell key={4} ky="keywords" value={this.props.row.keywords} saveValue={this.saveValue}/>
                <td><i className="material-icons red-text clickable" onClick={this.deleteRow}>delete</i></td>
              </tr>;
    }

    return (
      <tr>
        <TableCell key={0} ky="category" value="" saveValue={this.saveValue} />
        <TableCell key={1} ky="serialName" value="" saveValue={this.saveValue} />
        <TableCell key={2} ky="type" value="" saveValue={this.saveValue} />
        <TableCell key={3} ky="ratio" value="" saveValue={this.saveValue} />
        <TableCell key={4} ky="keywords" value="" saveValue={this.saveValue} />
        <td><i className="material-icons red-text clickable" onClick={this.deleteRow}>delete</i></td>
      </tr>
    )
  }
}

export default TableRow;