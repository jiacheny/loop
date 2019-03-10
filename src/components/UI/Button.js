import React from 'react';

const button = (props) => (
  <div className="col-md-1 align-self-end">
    <button className="btn btn-primary btn-block" onClick={props.clicked}>
      {props.text}
    </button>
  </div>
);

export default button;