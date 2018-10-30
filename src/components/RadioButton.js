import React from 'react';

const RadioButton = props => (
  <p>
    <input 
      name={props.name} 
      type="radio" 
      id={props.htmlID} 
      className={props.classes}
    />
    <label htmlFor={props.htmlID}>{props.label}</label>
  </p>
)

export default RadioButton;
