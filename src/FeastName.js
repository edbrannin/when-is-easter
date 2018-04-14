import React from 'react';
import _ from 'lodash';

const FeastName = ({ name }) => (
  <span>
    {_.startCase(name)}
  </span>
);

export default FeastName;
