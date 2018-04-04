import React, { Component } from 'react';
import moment from 'moment';

import { datesInYear, transposeDates } from './Dates'
import './App.css';

const Dates = (dates) => (
  <ul>
    {dates.map(date => <li>{date}</li>)}
  </ul>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.refStart = elem => { this.startInput = elem; this.compute(); };
    this.refEnd = elem => { this.endInput = elem; this.compute(); };
    this.compute = () => {
      if (this.startInput === undefined || this.endInput === undefined) {
        return;
      }
      console.log('compute!');
      const startDate = this.startInput.value;
      const endDate = this.endInput.value
      const years = [];
      const datesByYear = years.map(year => datesInYear(year));
      const daysByDate = transposeDates(datesByYear);
      this.setState({
        startDate,
        endDate,
        datesByYear,
      })
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">When is Easter?</h1>
          <label>
            Starting year:
            &nbsp;
            <input ref={this.refStart} defaultValue={moment().subtract(100, 'years').year()} />
          </label>
          <label>
            Ending year:
            &nbsp;
            <input ref={this.refEnd} defaultValue={moment().add(100, 'years').year()} />
          </label>
          <label>
            Compute:
            &nbsp;
            <button onClick={this.compute}/>
          </label>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
