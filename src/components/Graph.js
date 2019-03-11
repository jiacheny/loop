import React, {Component} from 'react';

import GroupNode from './UI/GroupNode';
import UserNode from './UI/UserNode';

import {drawGraph} from "./utils/Helper";

class Graph extends Component {

  render() {

    const graphData = drawGraph(this.props.isMemberOfGraph);
    let graph;
    for (const i in graphData) {
      const data = graphData[i];
      if (data.type === "g") {
        graph = [graph, <GroupNode key={data.key} name={this.getName(data.name)} indentation={data.indentation}/>]
      } else if (data.type === "u") {
        graph = [graph, <UserNode key={data.key} name={this.getName(data.name)} indentation={data.indentation}/>];
      }
    }

    return (
      <div id="membershipGraph">

        <div className="">
          <h2>Membership Graph</h2>
        </div>

        <div className="row">
          <div id="graph" className="rounded border border-light col-md-6 mx-auto">
            {graph}
          </div>
        </div>

      </div>
    );
  }

  getName = (key) => {
    return this.props.nodes[key].name;
  }

}

export default Graph;