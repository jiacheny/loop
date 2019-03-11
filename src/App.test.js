import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Graph from './components/Graph';
import renderer from 'react-test-renderer';


configure({adapter: new Adapter()});

describe('<App />', () => {

  let app;
  let nameInput, typeSelect, createButton, deleteButton;

  beforeEach(() => {
    app = mount(<App/>);
    nameInput = app.find("input").at(0);
    typeSelect = app.find("select").at(0);
    createButton = app.find("button").at(1);
    deleteButton = app.find("button").at(3);
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('adds a new user successfully', () => {

    const newUserName = "Test User";

    nameInput.instance().value = newUserName;
    nameInput.simulate("change");

    typeSelect.instance().value = "user";
    typeSelect.simulate("change");

    createButton.simulate("click");

    expect(Object.values(app.state("nodes")).filter(n => n.name === newUserName && n.type === 'user').length).toEqual(1);

  });

  it('add a new user with name already exists', () => {

    const initialNumberOfUser = Object.values(app.state("nodes")).filter(n => n.type === 'user').length;

    nameInput.instance().value = "User 1";
    nameInput.simulate("change");

    typeSelect.instance().value = "user";
    typeSelect.simulate("change");

    createButton.simulate("click");

    expect(Object.values(app.state("nodes")).filter(n => n.type === 'user').length).toEqual(initialNumberOfUser);
    expect(app.state("newNodeNameExist")).toEqual(true);
    expect(app.contains("This name already exists.")).toEqual(true);
    expect(app.contains("Please select a type.")).toEqual(false);

  });

  it('add a new group successfully', () => {

    const newGroupName = "Test Group";
    nameInput.instance().value = "Test Group";
    nameInput.simulate("change");

    typeSelect.instance().value = "group";
    typeSelect.simulate("change");

    const createButton = app.find("button").at(1);
    createButton.simulate("click");

    expect(Object.values(app.state("nodes")).filter(n => n.name === newGroupName && n.type === 'group').length).toEqual(1);
  });

  it('add a new group with name already exists', () => {

    const initialNumberOfGroup = Object.values(app.state("nodes")).filter(n => n.type === 'group').length;

    nameInput.instance().value = "Group 1";
    nameInput.simulate("change");

    typeSelect.instance().value = "group";
    typeSelect.simulate("change");

    createButton.simulate("click");

    expect(Object.values(app.state("nodes")).filter(n => n.type === 'group').length).toEqual(initialNumberOfGroup);
    expect(app.state("newNodeNameExist")).toEqual(true);
    expect(app.contains("This name already exists.")).toEqual(true);
    expect(app.contains("Please select a type.")).toEqual(false);

  });

  it('click create with no name and no type', () => {
    createButton.simulate("click");
    expect(app.contains("Please enter a name.")).toEqual(true);
    expect(app.contains("Please select a type.")).toEqual(true);
  });

  it('remove an existing user successfully', () => {

    const initialNumberOfUser = Object.values(app.state("nodes")).filter(n => n.type === 'user').length;

    nameInput.instance().value = "User 1";
    nameInput.simulate("change");

    typeSelect.instance().value = "user";
    typeSelect.simulate("change");

    deleteButton.simulate("click");
    expect(Object.values(app.state("nodes")).filter(n => n.type === 'user').length).toEqual(initialNumberOfUser - 1);

  });

  it('remove an existing group successfully', () => {

    const initialNumberOfGroup = Object.values(app.state("nodes")).filter(n => n.type === 'group').length;

    nameInput.instance().value = "Group 1";
    nameInput.simulate("change");

    typeSelect.instance().value = "group";
    typeSelect.simulate("change");

    deleteButton.simulate("click");
    expect(Object.values(app.state("nodes")).filter(n => n.type === 'group').length).toEqual(initialNumberOfGroup - 1);

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
    const appTree = renderer.create(<Graph nodes={mockState.nodes} isMemberOfGraph={mockState.isMemberOfGraph}/>).toJSON();
    expect(appTree).toMatchSnapshot();
  });

});