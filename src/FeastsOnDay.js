import React from 'react';
import FeastName from './FeastName';

const FeastsOnDay = ({ date, feastsAndDays }) => (
  <div>
    <h2>Feasts on {date}</h2>
    <table style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      }}
    >
      <tbody>
        {feastsAndDays.map(([feast, date]) => (
          <tr key={date.toISOString()}>
            <td>
              <FeastName name={feast} />
            </td>
            <td>
              {date.year()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FeastsOnDay;
