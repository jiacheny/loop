import ErrorMessage from "./ErrorMessage";
import React from "react";

const selectDynamics = (props) => {

  let sectionOptions;
  if (props.userOptions && props.groupOptions) {
    sectionOptions = {
      forUsers: <option disabled={true}>--- users ---</option>,
      forGroups: <option disabled={true}>--- groups ---</option>
    }
  }

  const invalidCssClass = props.isValid ? null : "is-invalid";

  return (
    <div className="col-md-2">
      <label>{props.label}</label>
      <select className={["custom-select", invalidCssClass].join(" ")} onChange={props.changed}>

        <option value="">{props.firstOptionText}</option>

        {sectionOptions ? sectionOptions.forUsers : null}
        {props.userOptions}

        {sectionOptions ? sectionOptions.forGroups : null}
        {props.groupOptions}

      </select>
      <ErrorMessage isValid={props.isValid} text={props.errorMessage}/>
    </div>
  );

};

export default selectDynamics;