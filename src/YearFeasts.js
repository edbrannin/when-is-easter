import React from 'react';
import { Link } from 'react-router-dom';

import FeastName from './FeastName';

const YearFeastRow = ({ feast, date }) => {
  if (feast === 'year' || !date.format) {
    return null;
  }

  const dateString = date.format('MM-DD');

  return (
    <tr key={feast}>
      <td>
        { false ?
          <Link to={`/feast/${feast}`}>
            <FeastName name={feast} />
          </Link>
          :
          <FeastName name={feast} />
        }
      </td>
      { false && <td>{date.format && date.format('ddd')}</td> }
      <td>
        <Link to={`/date/${dateString}`}>
          {dateString}
        </Link>
      </td>
    </tr>
  );
};

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
        {Object.entries(feasts).map(([feast, date]) => (
          <YearFeastRow key={feast} feast={feast} date={date} />
        ))}
      </tbody>
    </table>
  </div>
);

export default YearFeasts;
