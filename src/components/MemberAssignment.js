import React, {Component} from 'react';
import Button from './UI/Button';
import SelectDynamics from './UI/SelectDynamics';

class MemberAssignment extends Component {

  state = {
    member: null,
    group: null,
    isMemberValid: true,
    isGroupValid: true,
    isSameGroup: false
  };

  render() {

    const userOptions = Object.keys(this.props.nodes)
      .filter(k => this.props.nodes[k].type === 'user')
      .map(k => <option key={k} value={k}>{this.props.nodes[k].name}</option>);

    const groupOptions = Object.keys(this.props.nodes)
      .filter(k => this.props.nodes[k].type === 'group')
      .map(k => <option key={k} value={k}>{this.props.nodes[k].name}</option>);

    let memberErrorMessage;
    if (!this.state.isMemberValid) memberErrorMessage = "Please select a member.";
    if (this.state.isSameGroup) memberErrorMessage = "Group cannot be assigned to itself.";

    return (
      <div id="adding" className="form-row p-3 d-flex justify-content-center">

        <SelectDynamics label="Member" changed={this.memberChanged} firstOptionText="Select member" userOptions={userOptions} groupOptions={groupOptions}
                        isValid={this.state.isMemberValid && !this.state.isSameGroup} errorMessage={memberErrorMessage}/>

        <SelectDynamics label="Group" changed={this.groupChanged} firstOptionText="Select group" groupOptions={groupOptions}
                        isValid={this.state.isGroupValid} errorMessage="Please select a group."/>

        <Button text="Add" clicked={this.addClicked.bind(this)}/>

        <Button text="Remove" clicked={this.removeClicked.bind(this)}/>

      </div>
    )

  }

  // fixed the issue so that if the selected member is deleted, update the member in state to be null
  componentWillUpdate(nextProps, nextState, nextContext) {
    const doesExist = Object.keys(nextProps.nodes).filter(k => k === nextState.member).length > 0;
    if (!doesExist && this.state.member != null)
      this.setState({member: null});
  }

  memberChanged = (event) => {
    this.setState({
      member: event.target.value,
      isMemberValid: true
    });
  };

  groupChanged = (event) => {
    this.setState({
      group: event.target.value,
      isGroupValid: true
    });
  };

  addClicked() {
    if (this.isInputValid())
      this.props.addClicked(this.state.member, this.state.group);
  }

  removeClicked() {
    if (this.isInputValid())
      this.props.removeClicked(this.state.member, this.state.group);
  }

  isInputValid() {
    const isMemberValid = this.state.member != null && this.state.member.length !== 0;
    const isGroupValid = this.state.group != null && this.state.group.length !== 0;

    let isSameGroup = false;
    if (isMemberValid && isGroupValid) {
      if (this.state.member === this.state.group)
        isSameGroup = true;
    }

    this.setState({
      isMemberValid: isMemberValid,
      isGroupValid: isGroupValid,
      isSameGroup: isSameGroup
    });

    return isMemberValid && isGroupValid && !isSameGroup;
  }

}

export default MemberAssignment;