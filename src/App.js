import React, {Component} from 'react';
import './App.css';

import SingleMemberManagement from './components/SingleMemberManagement';
import MemberAssignment from './components/MemberAssignment';
import Graph from './components/Graph';

import {randomKey} from "./utils/Helper";

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

        <MemberAssignment
          nodes={this.state.nodes}
          addClicked={this.addClicked.bind(this)}
          removeClicked={this.removeClicked.bind(this)}
        />

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
      const isMemberOfGraph = this.state.isMemberOfGraph.filter(function (e) {
        return e.from !== key && e.to !== key;
      });

      this.setState({
        nodes: nodes,
        isMemberOfGraph: isMemberOfGraph
      })
    }

  }

  addClicked(memberKey, groupKey) {
    const doesExist = this.state.isMemberOfGraph.filter(function (e) {
      return e.from === memberKey && e.to === groupKey;
    }).length > 0;
    if (!doesExist) {
      const isMemberOfGraph = this.state.isMemberOfGraph;

      // search if there is a reverse relationship. If so, remove.
      const reversePair = this.state.isMemberOfGraph.find(
        e => e.from === groupKey && e.to === memberKey
      );
      isMemberOfGraph.splice(isMemberOfGraph.indexOf(reversePair), 1);

      isMemberOfGraph.push({from: memberKey, to: groupKey});
      this.setState({isMemberOfGraph: isMemberOfGraph});
    }
  }

  removeClicked(memberKey, groupKey) {
    if (memberKey.startsWith("g")) {
      const isMemberOfGraph = this.state.isMemberOfGraph.filter(function (e) {
        return e.from !== memberKey && e.to !== memberKey;
      });
      this.setState({isMemberOfGraph: isMemberOfGraph});
    } else if (memberKey.startsWith("u")) {
      const isMemberOfGraph = this.state.isMemberOfGraph.filter(function (e) {
        return e.from !== memberKey || e.to !== groupKey;
      });
      this.setState({isMemberOfGraph: isMemberOfGraph});
    }
  }

  getKeyForNewNode(newNode) {
    let key = randomKey(newNode.type);
    while (key in this.state.nodes) {
      key = randomKey(newNode);
    }
    return key;
  }

}

export default App;
