import React, {Component} from 'react';

class EmptyNode extends Component {
  render() {
    let div;
    if (!isNaN(this.props.indentation)) {
      div = <div style={{height: 50, width: 50 * this.props.indentation}}/>;
    }
    return (
      div
    );
  }

}

export default EmptyNode;