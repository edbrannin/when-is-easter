import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import YearFeasts from './YearFeasts';
import FeastsOnDay from './FeastsOnDay';
import {
  yearSpan,
  feastsInYear,
  feastsByYearToFeastsOnDay,
} from './Feasts';
import Debug from './Debug';

const computeEasterForYears = ({ startYear, endYear }) => {
  const years = yearSpan(startYear, endYear);
  const feastsByYear = years.map(feastsInYear);
  // const feastsByDate = feastsInYearsToFeastsByDay(feastsByYear);
  const datesByFeast = {};

  return {
    done: true,
    startYear,
    endYear,
    years,
    feastsByYear,
    // feastsByDate,
    datesByFeast,
  };
};

class FeastApp extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.startYear === undefined || nextProps.endYear === undefined) {
      return {};
    }
    if (
      prevState.startYear === nextProps.startYear &&
      prevState.endYear === nextProps.endYear
    ) {
      return {};
    }
    return computeEasterForYears(nextProps);
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { highlightYear } = this.props;
    const {
      feastsByYear,
      // feastsByDate,
      datesByFeast,
      done,
    } = this.state;
    return !done ? <div /> : (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={props => (
              <div>
                {feastsByYear &&
                  feastsByYear.map(feasts => (
                    <YearFeasts
                      key={feasts.year}
                      feasts={feasts}
                      highlightYear={highlightYear}
                      {...props}
                    />
                ))}
              </div>
            )}
          />
          <Route
            path="/date/:monthAndDay"
            render={({ match }) => (
              <div>
                <Link to="/">Back</Link>
                <FeastsOnDay
                  date={match.params.monthAndDay}
                  feastsAndDays={feastsByYearToFeastsOnDay(feastsByYear, match.params.monthAndDay)}
                />
                <Debug
                  match={match}
                  date={match.params.monthAndDay}
                  feastsAndDays={feastsByYearToFeastsOnDay(feastsByYear, match.params.monthAndDay)}
                />
              </div>
            )}
          />
          <Route
            path="/feast/:name"
            render={({ match }) => (
              <div>
                <Link to="/">Back</Link>
                <Debug match={match} dates={datesByFeast[match.params.name]} />
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default FeastApp;
