import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Graph from './components/Graph';
import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

function click(button) {
  button.simulate("click");
}

function change(field, value) {
  field.instance().value = value;
  field.simulate("change");
}

describe('<App />', () => {

  let app;
  let nameInput, typeSelect, createButton, deleteButton;
  let memberSelect, groupSelect, addButton, removeButton;

  beforeEach(() => {
    app = mount(<App/>);
    nameInput = app.find("input").at(0);
    typeSelect = app.find("select").at(0);
    createButton = app.find("button").at(1);
    deleteButton = app.find("button").at(3);
    memberSelect = app.find("select").at(1);
    groupSelect = app.find("select").at(2);
    addButton = app.find("button").at(5);
    removeButton = app.find("button").at(7);
  });


  it('add a user to a group', () => {
    change(memberSelect, "u3");
    change(groupSelect, "g2");
    click(addButton);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "u3" && e.to === "g2").length).toEqual(1);
  });

  it('add a user (who already in that group) to a group', () => {
    expect(app.state("isMemberOfGraph").filter(e => e.from === "u1" && e.to === "g2").length).toEqual(1);
    change(memberSelect, "u1");
    change(groupSelect, "g2");
    click(addButton);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "u1" && e.to === "g2").length).toEqual(1);
  });

  it('add a group to a group', () => {
    change(memberSelect, "g5");
    change(groupSelect, "g1");
    click(addButton);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "g5" && e.to === "g1").length).toEqual(1);
  });

  it('should not add a group to itself', () => {
    const initialCount = app.state("isMemberOfGraph").length;
    change(memberSelect, "g1");
    change(groupSelect, "g1");
    click(addButton);
    expect(app.contains("Group cannot be assigned to itself.")).toEqual(true);
    expect(app.state("isMemberOfGraph").length).toEqual(initialCount);
  });

  it('remove a user from a group', () => {
    change(memberSelect, "u1");
    change(groupSelect, "g5");
    click(removeButton);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "u1" && e.to === "g5").length).toEqual(0);
  });

  it('remove a group from a group', () => {
    expect(app.state("isMemberOfGraph").filter(e => e.from === "g2" && e.to === "g1").length).toEqual(1);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "u1" && e.to === "g2").length).toEqual(1);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "u2" && e.to === "g2").length).toEqual(1);
    change(memberSelect, "g2");
    change(groupSelect, "g1");
    click(removeButton);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "g2" && e.to === "g1").length).toEqual(0);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "u1" && e.to === "g2").length).toEqual(0);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "u2" && e.to === "g2").length).toEqual(0);
  });

  // this test is mainly to test whether the state in <MemberAssignment/> is updated when a user has been removed.
  it('select a user/group member first, delete this user/group completely, then click add, should have error messages for member select and group select', () => {
    change(memberSelect, "u1");
    change(nameInput, "User 1");
    change(typeSelect, "user");
    click(deleteButton);
    click(addButton);
    expect(app.contains("Please select a member.")).toEqual(true);
    expect(app.contains("Please select a group.")).toEqual(true);
  });

  it('assign a parent group back to its child group', () => {
    change(memberSelect, "g1");
    change(groupSelect, "g2");
    click(addButton);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "g1" && e.to === "g2").length).toEqual(1);
    expect(app.state("isMemberOfGraph").filter(e => e.from === "g2" && e.to === "g1").length).toEqual(0);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('adds a new user successfully', () => {
    const newUserName = "Test User";
    change(nameInput, newUserName);
    change(typeSelect, "user");
    click(createButton);
    expect(Object.values(app.state("nodes")).filter(n => n.name === newUserName && n.type === 'user').length).toEqual(1);

  });

  it('add a new user with name already exists', () => {
    const initialNumberOfUser = Object.values(app.state("nodes")).filter(n => n.type === 'user').length;
    change(nameInput, "User 1");
    change(typeSelect, "user");
    click(createButton);
    expect(Object.values(app.state("nodes")).filter(n => n.type === 'user').length).toEqual(initialNumberOfUser);
    expect(app.state("newNodeNameExist")).toEqual(true);
    expect(app.contains("This name already exists.")).toEqual(true);
    expect(app.contains("Please select a type.")).toEqual(false);

  });

  it('add a new group successfully', () => {
    const newGroupName = "Test Group";
    change(nameInput, newGroupName);
    change(typeSelect, "group");
    click(createButton);
    expect(Object.values(app.state("nodes")).filter(n => n.name === newGroupName && n.type === 'group').length).toEqual(1);
  });

  it('add a new group with name already exists', () => {
    const initialNumberOfGroup = Object.values(app.state("nodes")).filter(n => n.type === 'group').length;
    change(nameInput, "Group 1");
    change(typeSelect, "group");
    click(createButton);
    expect(Object.values(app.state("nodes")).filter(n => n.type === 'group').length).toEqual(initialNumberOfGroup);
    expect(app.state("newNodeNameExist")).toEqual(true);
    expect(app.contains("This name already exists.")).toEqual(true);
    expect(app.contains("Please select a type.")).toEqual(false);

  });

  it('click create with no name and no type', () => {
    click(createButton);
    expect(app.contains("Please enter a name.")).toEqual(true);
    expect(app.contains("Please select a type.")).toEqual(true);
  });

  it('delete an existing user successfully', () => {
    const initialNumberOfUser = Object.values(app.state("nodes")).filter(n => n.type === 'user').length;
    change(nameInput, "User 1");
    change(typeSelect, "user");
    click(deleteButton);
    const expectedIsMemberOfGraph = [
      {from: "g2", to: "g1"},
      {from: "g3", to: "g1"},
      {from: "g4", to: "g1"},
      {from: "u2", to: "g2"},
      {from: "u3", to: "g3"},
      {from: "u4", to: "g3"},
      {from: "u5", to: "g4"},
      {from: "u6", to: "g4"},
      {from: "u7", to: "g5"}
    ];
    expect(Object.values(app.state("nodes")).filter(n => n.type === 'user').length).toEqual(initialNumberOfUser - 1);
    expect(app.state("isMemberOfGraph").length).toEqual(expectedIsMemberOfGraph.length);

    const graphTree = renderer.create(
      <Graph nodes={app.state("nodes")} isMemberOfGraph={app.state("isMemberOfGraph")}/>
    ).toJSON();
    expect(graphTree).toMatchSnapshot();

  });

  it('delete an existing group successfully', () => {
    const initialNumberOfGroup = Object.values(app.state("nodes")).filter(n => n.type === 'group').length;
    change(nameInput, "Group 1");
    change(typeSelect, "group");
    click(deleteButton);
    const expectedIsMemberOfGraph = [
      {from: "u1", to: "g2"},
      {from: "u1", to: "g5"},
      {from: "u2", to: "g2"},
      {from: "u3", to: "g3"},
      {from: "u4", to: "g3"},
      {from: "u5", to: "g4"},
      {from: "u6", to: "g4"},
      {from: "u7", to: "g5"}
    ];
    expect(Object.values(app.state("nodes")).filter(n => n.type === 'group').length).toEqual(initialNumberOfGroup - 1);
    expect(app.state("isMemberOfGraph").length).toEqual(expectedIsMemberOfGraph.length);

    const graphTree = renderer.create(
      <Graph nodes={app.state("nodes")} isMemberOfGraph={app.state("isMemberOfGraph")}/>
    ).toJSON();
    expect(graphTree).toMatchSnapshot();

  });

  it('graph matches the snapshot', () => {
    const mockState = {
      nodes: {
        "g1": {name: "Group 1", type: "group"},
        "g2": {name: "Group 2", type: "group"},
        "g3": {name: "Group 3", type: "group"},
        "g4": {name: "Group 4", type: "group"},
        "g5": {name: "Group 5", type: "group"},
        "g6": {name: "Group 6", type: "group"},
        "g7": {name: "Group 7", type: "group"},
        "u1": {name: "User 1", type: "user"},
        "u2": {name: "User 2", type: "user"},
        "u3": {name: "User 3", type: "user"},
        "u4": {name: "User 4", type: "user"},
        "u5": {name: "User 5", type: "user"},
        "u6": {name: "User 6", type: "user"},
        "u7": {name: "User 7", type: "user"}
      },
      isMemberOfGraph: [
        {from: "g2", to: "g1"},
        {from: "g3", to: "g1"},
        {from: "g4", to: "g1"},
        {from: "u1", to: "g2"},
        {from: "u1", to: "g5"},
        {from: "u2", to: "g2"},
        {from: "u3", to: "g3"},
        {from: "u4", to: "g3"},
        {from: "u5", to: "g4"},
        {from: "u6", to: "g4"},
        {from: "u7", to: "g5"}
      ],
      newNodeNameExist: false
    };
    const graphTree = renderer.create(
      <Graph nodes={mockState.nodes} isMemberOfGraph={mockState.isMemberOfGraph}/>
    ).toJSON();
    expect(graphTree).toMatchSnapshot();
  });

});