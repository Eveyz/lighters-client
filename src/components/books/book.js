import React from 'react';
import 'materialize-css/dist/js/materialize.min';
import M from 'materialize-css';

class Book extends React.Component {
  constructor(props) {
    super(props)

    this.dropdown = React.createRef();
  }

  componentDidMount() {
    M.AutoInit();
    let elems = this.dropdown;
    M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
  }

  render() {
    let id = "dropdown-" + this.props.id;
    return(
      <tr>
        <td>{this.props.book.rlevel}</td>
        <td>{this.props.book.lslevel}</td>
        <td>{this.props.book.age}</td>
        <td>{this.props.book.category}</td>
        <td>{this.props.book.serials}</td>
        <td>{this.props.book.name}</td>
        <td>{this.props.book.name}</td>
        <td><button className="btn cyan">编辑</button></td>
        <td><button className="btn">查看</button></td>
        <td><button className="btn red">删除</button></td>
      </tr>
    )
  }
}

export default Book;
