import React, { Component } from "react";
import moment from "moment";
import _ from 'lodash';

import {
  yearSpan,
  feastsInYear,
  feastsInYears,
  feastsInYearsToFeastsByDay
} from "./Dates";
import "./App.css";

const Feasts = feasts => <ul>{feasts.map(date => <li>{date}</li>)}</ul>;

const Debug = props => <pre>{JSON.stringify(props, null, 2)}</pre>

const YearFeasts = ({ feasts, highlightYear }) => (
  <div
    key={feasts.year}
    style={{
      float: 'left',
      margin: '1em',
      backgroundColor: (highlightYear === feasts.year) && 'wheat',
      borderRadius: '1em',
  }}
    id={feasts.year}
  >
    <h2>{feasts.year}</h2>
    <table>
      <tbody>
        {Object.entries(feasts).map(([k, v]) => (k !== 'year' &&
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
      if (this.input) {
        this.props.callback(Number(this.input.value));
      }
    }
    this.ref = elem => {
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
  const feastsByYear = years.map(feastsInYear);
  const daysByDate = feastsInYearsToFeastsByDay(feastsByYear);

  return {
    startYear,
    endYear,
    years,
    feastsByYear,
    daysByDate
  };
};

class FeastApp extends Component {
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
    const { feastsByYear } = this.state;
    return (
      <div>
        {feastsByYear
          && feastsByYear.map(feasts => <YearFeasts key={feasts.year} feasts={feasts} highlightYear={highlightYear} />) }
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
        <FeastApp startYear={startYear} endYear={endYear} highlightYear={thisYear} />
      </div>
    );
  }
}

export default App;
