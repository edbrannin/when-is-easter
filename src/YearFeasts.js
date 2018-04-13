import React from "react";
import _ from 'lodash';

const YearFeasts = ({ feasts, highlightYear }) => (
  <div
    key={feasts.year}
    style={{
      display: 'inline-block',
      padding: '1em',
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
            { false && <td>{v.format && v.format('ddd')}</td> }
            <td>{v.format ? v.format("MM-DD") : v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default YearFeasts;
