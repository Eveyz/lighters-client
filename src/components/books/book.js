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
        <td>{this.props.book.quantity}</td>
        <td>
          <a className='dropdown-button btn' href='javascript:;' data-activates={id} ref={this.dropdown}>Drop Me!</a>

          <ul id={id} className='dropdown-content'>
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider"></li>
            <li><a href="#!">three</a></li>
            <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
            <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
          </ul>
        </td>
      </tr>
    )
  }
}

export default Book;
