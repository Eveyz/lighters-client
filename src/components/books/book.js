import React from 'react';
import { Dropdown, Button, NavItem } from 'react-materialize';

const Book = props => (
  <tr>
    <td>{props.book.rlevel}</td>
    <td>{props.book.lslevel}</td>
    <td>{props.book.age}</td>
    <td>{props.book.category}</td>
    <td>{props.book.serials}</td>
    <td>{props.book.name}</td>
    <td>{props.book.quantity}</td>
    <td>
      <Dropdown trigger={
        <Button>更多</Button>
      }>
        <NavItem>查看</NavItem>
        <NavItem>编辑</NavItem>
        <NavItem>删除</NavItem>
      </Dropdown>
    </td>
  </tr>
)

export default Book;
