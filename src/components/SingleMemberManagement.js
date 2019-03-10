import React, {Component} from 'react';

import Button from './UI/Button';
import NameInput from './UI/NameInput';
import SelectBasic from './UI/SelectBasic';

class SingleMemberManagement extends Component {

  state = {
    name: null,
    type: null,
    isNameValid: true,
    isTypeValid: true
  };

  render() {

    let nameInputErrorMessage;
    if (!this.state.isNameValid) nameInputErrorMessage = "Please enter a name.";
    if (this.props.newNodeNameExist) nameInputErrorMessage = "This name already exists.";

    return (
      <div id="creating" className="form-row p-3 d-flex justify-content-center">

        <NameInput changed={this.nameChanged} isValid={this.state.isNameValid && !this.props.newNodeNameExist} errorMessage={nameInputErrorMessage}/>

        <SelectBasic changed={this.typeChanged} isValid={this.state.isTypeValid} errorMessage={"Please select a type."} />

        <Button text="Create" clicked={this.createClicked.bind(this)}/>

        <Button text="Delete" clicked={this.deleteClicked.bind(this)}/>

      </div>

    );
  }

  nameChanged = (event) => {
    this.setState({
      name: event.target.value,
      isNameValid: true
    });
  };

  typeChanged = (event) => {
    this.setState({
      type: event.target.value,
      isTypeValid: true
    });
  };

  createClicked() {
    if (this.isInputValid()) {
      this.props.createClicked(
        {name: this.state.name, type: this.state.type}
      );
    }
  }

  deleteClicked() {
    if (this.isInputValid())
      this.props.deleteClicked(
        {name: this.state.name, type: this.state.type}
      );
  }

  isInputValid() {
    const isNameValid = !(!this.state.name || this.state.name.length === 0);
    const isTypeValid = this.state.type === 'user' || this.state.type === 'group';
    this.setState({
      isNameValid: isNameValid,
      isTypeValid: isTypeValid
    });
    return isNameValid && isTypeValid;
  }

}

export default SingleMemberManagement;