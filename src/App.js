import React, { Component } from "react";
import moment from "moment";
import _ from 'lodash';

import {
  yearSpan,
  datesInYear,
  datesInYears,
  datesInYearsToDatesByDay
} from "./Dates";
import "./App.css";

const Dates = dates => <ul>{dates.map(date => <li>{date}</li>)}</ul>;

const Debug = data => <pre>{JSON.stringify(data, null, 2)}</pre>

const YearDates = ({ dates, highlightYear }) => (
  <div
    key={dates.year}
    style={{
      float: 'left',
      margin: '1em',
      backgroundColor: (highlightYear === dates.year) && 'wheat',
      borderRadius: '1em',
  }}
    id={dates.year}
  >
    <h2>{dates.year}</h2>
    <table>
  <tbody>
      {Object.entries(dates).map(([k, v]) => (k !== 'year' &&
        <tr key={k}>
          <td>{_.startCase(k)}</td>
          <td>{v.format ? v.format("MM-DD") : v}</td>
        </tr>
      ))}
  </tbody>
    </table>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refStart = elem => {
      this.startInput = elem;
    };
    this.refEnd = elem => {
      this.endInput = elem;
    };
    this.compute = () => {
      if (typeof(this.startInput) === 'undefined' || typeof(this.endInput) === 'undefined') {
        console.log('undefined');
        return;
      }
      if (this.startInput === null || this.endInput === null) {
        console.log('Null inputs.');
        return;
      }
      console.log("compute!");
      const startDate = Number(this.startInput.value);
      const endDate = Number(this.endInput.value);
      if (this.state.startDate === startDate && this.state.endDate === endDate) {
        console.log("Don't compute, actually -- dates are unchanged.");
        return;
      }
      console.log(`Computing ${startDate} to ${endDate}`);
      const years = yearSpan(startDate, endDate);
      console.log(`Year count expected: ${endDate - startDate + 1}, actual: ${years.length}`);
      const datesByYear = years.map(datesInYear);
      const daysByDate = datesInYearsToDatesByDay(datesByYear);
      this.setState({
        startDate,
        endDate,
        years,
        datesByYear,
        daysByDate
      });
    };
  }

  componentDidMount() {
    this.compute();
  }

  render() {
    const thisYear = moment().year()
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">When is Easter?</h1>
          <label>
            Starting year: &nbsp;
            <input
              ref={this.refStart}
              defaultValue={moment()
                .subtract(100, "years")
                .year()}
              onBlur={this.compute}
            />
          </label>
          <label>
            Ending year: &nbsp;
            <input
              ref={this.refEnd}
              defaultValue={moment()
                .add(100, "years")
                .year()}
              onBlur={this.compute}
            />{" "}
          </label>{" "}
          <button onClick={this.compute}>Compute!</button>{" "}
      {
        // TODO: Add UI to set span length around this year
      }
        </header>{" "}
        <div>
          {this.state.datesByYear 
            && this.state.datesByYear.map(dates => <YearDates dates={dates} highlightYear={thisYear} />) }
        </div>
      </div>
    );
  }
}

export default App;
