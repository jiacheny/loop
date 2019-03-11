import React, {Component} from 'react';
import './App.css';

import SingleMemberManagement from './components/SingleMemberManagement';
import Graph from './components/Graph';

const headerStyle = {
  height: '100px'
};

class App extends Component {

  constructor() {
    super();
    this.state = {
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
    }
  }

  render() {
    return (

      <div className="App">

        <div style={headerStyle} className="bg-primary text-white d-flex justify-content-center align-items-center">
          <h1>Loop Membership Management</h1>
        </div>

        <SingleMemberManagement
          newNodeNameExist={this.state.newNodeNameExist}
          createClicked={this.createClicked.bind(this)}
          deleteClicked={this.deleteClicked.bind(this)}
        />

        <div id="memberAssignment" className="form-row p-3 d-flex justify-content-center">

          <div className="col-md-2">
            <label>Member</label>
            <select className="custom-select">
              <option>Select member</option>
              <option disabled={true}>--- users ---</option>
              <option disabled={true}>--- groups ---</option>
            </select>
          </div>


          <div className="col-md-2">
            <label>Group</label>
            <select className="custom-select">
              <option>Select group</option>
            </select>
          </div>

          <div className="col-md-1 align-self-end">
            <button className="btn btn-primary btn-block">
              Add
            </button>
          </div>

          <div className="col-md-1 align-self-end">
            <button className="btn btn-primary btn-block">
              Remove
            </button>
          </div>
        </div>

        <Graph nodes={this.state.nodes} isMemberOfGraph={this.state.isMemberOfGraph}/>

      </div>

    );
  }

  createClicked(newNode) {

    const nodes = this.state.nodes;

    const doesExist = !(Object.values(nodes).filter(e =>
      e.type === newNode.type && e.name === newNode.name
    ).length === 0);

    if (!doesExist) {
      let key = this.getKeyForNewNode(newNode);
      nodes[key] = newNode;
      this.setState({
        nodes: nodes,
        newNodeNameExist: false
      });
    } else {
      this.setState({
        newNodeNameExist: true
      })
    }

  };

  deleteClicked(node) {
    const nodes = this.state.nodes;
    const key = Object.keys(nodes).find(k =>
      nodes[k].name === node.name && nodes[k].type === node.type
    );
    if (key) {
      delete nodes[key];
    }

  }

  getRandomKey(newNode) {
    let key = "";
    let id = Math.round(Math.random() * 100);
    if (newNode.type === 'group') {
      key = "g" + id;
    } else if (newNode.type === "user") {
      key = "u" + id;
    }
    return key;
  }

  getKeyForNewNode(newNode) {
    let key = this.getRandomKey(newNode);
    while (key in this.state.nodes) {
      key = this.getRandomKey(newNode);
    }
    return key;
  }

}

export default App;
