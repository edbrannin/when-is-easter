import React, { Component } from 'react';

class YearInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBlur = () => {
      if (this.input) {
        this.props.callback(Number(this.input.value));
      }
    };
    this.ref = (elem) => {
      this.input = elem;
      this.onBlur();
    };
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
    );
  }
}

export default YearInput;
