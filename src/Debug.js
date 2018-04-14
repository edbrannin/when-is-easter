import React from 'react';

const Debug = props => (
  <pre style={{
    textAlign: 'left',
  }}
  >
    {JSON.stringify(props, null, 2)}
  </pre>
);

export default Debug;
