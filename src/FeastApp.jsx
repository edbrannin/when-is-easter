import React, { Component } from 'react';

import YearFeasts from './YearFeasts';
import { yearSpan, feastsInYear, feastsInYearsToFeastsByDay } from './Feasts';

const computeEasterForYears = ({ startYear, endYear }) => {
  const years = yearSpan(startYear, endYear);
  const feastsByYear = years.map(feastsInYear);
  const daysByDate = feastsInYearsToFeastsByDay(feastsByYear);

  return {
    startYear,
    endYear,
    years,
    feastsByYear,
    daysByDate,
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
    const { feastsByYear } = this.state;
    return (
      <div>
        {feastsByYear &&
          feastsByYear.map(feasts => (
            <YearFeasts
              key={feasts.year}
              feasts={feasts}
              highlightYear={highlightYear}
            />
          ))}
      </div>
    );
  }
}

export default FeastApp;
