import React, { Component } from 'react';
import './App.css';

import Table from './containers/Table/Table';
import AddLink from './containers/AddLink/AddLink';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is my Link Wiki App</h1>
        <AddLink />
        <h2>My links</h2>
        <Table />
      </div>
    );
  }
}

export default App;
