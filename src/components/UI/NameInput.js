import ErrorMessage from "./ErrorMessage";
import React from "react";

const nameInput = (props) => {
  const invalidCssClass = props.isValid ? null : "is-invalid";
  return (
    <div className="col-md-2">
      <label>Name</label>
      <input placeholder="Enter a name" key="member" className={["form-control", invalidCssClass].join(" ")} onChange={props.changed}/>
      <ErrorMessage isValid={props.isValid} text={props.errorMessage}/>
    </div>
  );

};

export default nameInput;