import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Document from './components/Document';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Document />
      </div>
    );
  }
}

export default App;
