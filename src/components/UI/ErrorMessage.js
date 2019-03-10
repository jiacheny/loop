import React from 'react';

const errorMessage = (props) => (
  props.isValid === false ? <div className="invalid-feedback">{props.text}</div> : null
);

export default errorMessage;