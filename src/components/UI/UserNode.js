import React from 'react';
import EmptyNode from './EmptyNode';

const userDivStyle = {
  height: '50px',
  width: '150px',
  marginBottom: '5px'
};

const userNode = (props) => (
  <div className="form-row">
    <EmptyNode indentation={props.indentation}/>
    <div style={userDivStyle}
         className="border border-primary rounded d-flex justify-content-center align-items-center">
      {props.name}
    </div>
  </div>
);

export default userNode;