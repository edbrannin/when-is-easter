import React, { Component } from "react";
import moment from "moment";

import YearInput from './YearInput';
import FeastApp from './FeastApp';
// import Debug from './Debug';
import "./App.css";

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
