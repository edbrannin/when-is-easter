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

const Debug = props => <pre>{JSON.stringify(props, null, 2)}</pre>

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

class YearInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBlur = () => {
      console.log(`onBlur for ${this.props.label}`);
      if (this.input) {
        console.log(`Invoking callback for ${this.props.label}`);
        this.props.callback(Number(this.input.value));
      }
    }
    this.ref = elem => {
      console.log(`Setting ref for ${this.props.label}`);
      this.input = elem;
      this.onBlur();
    }
  }

  render() {
    const { label, defaultValue } = this.props;
    return (
      <label>
        {label} year: &nbsp;
        <input
          ref={this.ref}
          onBlur={this.onBlur}
          defaultValue={defaultValue}
        />
      </label>
    )
  }
}

const computeEasterForYears = ({
  startYear,
  endYear,
}) => {
  const years = yearSpan(startYear, endYear);
  const datesByYear = years.map(datesInYear);
  const daysByDate = datesInYearsToDatesByDay(datesByYear);

  return {
    startYear,
    endYear,
    years,
    datesByYear,
    daysByDate
  };
};

class DatesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.startYear === undefined || nextProps.endYear === undefined) {
      return {};
    }
    if (prevState.startYear === nextProps.startYear
        && prevState.endYear === nextProps.endYear) {
      return {};
    }
    return computeEasterForYears(nextProps);
  }

  render() {
    const { highlightYear } = this.props;
    const { datesByYear } = this.state;
    return (
      <div>
        {datesByYear
          && datesByYear.map(dates => <YearDates key={dates.year} dates={dates} highlightYear={highlightYear} />) }
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setStart = value => {
      this.setState({ startYear: value })
    };
    this.setEnd = value => {
      this.setState({ endYear: value })
    };
  }

  render() {
    const thisYear = moment().year()
    const { startYear, endYear } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">When is Easter?</h1>
          <YearInput
            label="Starting"
            defaultValue={moment().subtract(100, 'years').year()}
            callback={this.setStart}
          />
          <YearInput
            label="Ending"
            defaultValue={moment().add(100, 'years').year()}
            callback={this.setEnd}
          />
          {
            // TODO: Add UI to set span length around this year
          }
        </header>
        <DatesApp startYear={startYear} endYear={endYear} highlightYear={thisYear} />
      </div>
    );
  }
}

export default App;
