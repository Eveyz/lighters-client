import React from 'react';

const CheckBox = props => (
  <p>
    <input 
      name={props.name} 
      type="checkbox" 
      id={props.htmlID} 
      className={props.classes}
    />
    <label htmlFor={props.htmlID}>{props.label}</label>
  </p>
)

export default CheckBox;
