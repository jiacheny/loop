import React, {Component} from 'react';
import './App.css';

const headerStyle = {
  height: '100px'
};

class App extends Component {
  render() {
    return (

      <div className="App">

        <div style={headerStyle} className="bg-primary text-white d-flex justify-content-center align-items-center">
          <h1>Loop Membership Management</h1>
        </div>

        <div id="singleMemberManagement" className="form-row p-3 d-flex justify-content-center">

          <div className="col-md-2">
            <label>Name</label>
            <input className="form-control"/>
          </div>


          <div className="col-md-2">
            <label>Type</label>
            <select className="custom-select">
              <option>Select type</option>
              <option value="group">group</option>
              <option value="user">user</option>
            </select>
          </div>

          <div className="col-md-1 align-self-end">
            <button className="btn btn-primary btn-block">
              Create
            </button>
          </div>

          <div className="col-md-1 align-self-end">
            <button className="btn btn-primary btn-block">
              Delete
            </button>
          </div>

        </div>

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

        <div id="membershipGraph">
          <h3>Membership Graph</h3>
          <div>Placeholders</div>
        </div>

      </div>

    );
  }
}

export default App;
