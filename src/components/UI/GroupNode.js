import React from 'react';

import EmptyNode from './EmptyNode';

const groupDivStyle = {
  height: '50px',
  width: '150px',
  margin: '5px'
};

const groupNode = (props) => (
  <div className="form-row">
    <EmptyNode indentation={props.indentation}/>
    <div style={groupDivStyle} className="bg-primary text-white rounded d-flex justify-content-center align-items-center">
      {props.name}
    </div>
  </div>

);

export default groupNode;