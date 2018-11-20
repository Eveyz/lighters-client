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
  }

  render() {
    let operations = this.props.readOnly ?  
    <td><button className="btn cyan">查看</button></td>
    : 
    <td>
      <a className='dropdown-trigger btn' href='' data-target={this.props.id}>更多操作</a>

      <ul id={this.props.id} className='dropdown-content'>
        <li><a href="">编辑</a></li>
        <li><a href="">查看</a></li>
        <li><a href="" className="red-text">删除</a></li>
      </ul>
    </td>;
    return(
      <tr>
        <td>{this.props.book.lightersLevel}</td>
        <td>{this.props.book.razLevel}</td>
        <td>{this.props.book.lexileLevel}</td>
        <td>{this.props.book.age}</td>
        <td>{this.props.book.category}</td>
        <td>{this.props.book.serials}</td>
        <td>{this.props.book.name}</td>
        {operations}
      </tr>
    )
  }
}

export default Book;
