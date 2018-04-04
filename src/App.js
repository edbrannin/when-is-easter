import React, { Component } from 'react';
import moment from 'moment';

import { datesInYear } from './Dates'
import './App.css';

const Dates = (dates) => (
  <ul>
    {dates.map(date => <li>{date}</li>)}
  </ul>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">When is Easter?</h1>
          <label>
            Starting year:
            &nbsp;
            <input ref={this.refStart} default={moment().subtract(100, 'years')} />
          </label>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }

  refStart(e) {
    this.startInput = e;
  }

  refEnd(e) {
    this.endInput = e;
  }
}

export default App;
