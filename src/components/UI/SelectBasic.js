import React from 'react';
import ErrorMessage from "./ErrorMessage";

const selectBasic = (props) => {

  const invalidCssClass = props.isValid ? null : "is-invalid";

  return (
    <div className="col-md-2">
      <label>Type</label>
      <select className={["custom-select", invalidCssClass].join(" ")} onChange={props.changed}>
        <option>Select type</option>
        <option value="group">group</option>
        <option value="user">user</option>
      </select>
      <ErrorMessage isValid={props.isValid} text={props.errorMessage}/>
    </div>
  );

};

export default selectBasic;