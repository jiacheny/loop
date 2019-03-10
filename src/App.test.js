import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

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

});