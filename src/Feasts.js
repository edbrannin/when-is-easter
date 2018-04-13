import moment from 'moment-easter';
import _ from 'lodash';

const yearSpan = (start, end) => _.range(start, end + 1);

const feastsInYear = (year) => {
  const easter = moment({ y: year }).easter();
  const ashWednesday = easter.clone().subtract(46, 'days');
  const palmSunday = easter.clone().subtract(7, 'days');
  const spyWednesday = easter.clone().subtract(4, 'days');
  const holyThursday = easter.clone().subtract(3, 'days');
  const goodFriday = easter.clone().subtract(2, 'days');
  const holySaturday = easter.clone().subtract(1, 'day');
  const mercySunday = easter.clone().add(7, 'days');
  const ascensionThursday = easter.clone().add(39, 'days');
  const pentecost = easter.clone().add(49, 'days');

  const trinitySunday = pentecost.clone().add(7, 'days');
  const corpusChristi = pentecost.clone().add(11, 'days');
  const sanguinemqueSunday = pentecost.clone().add(14, 'days');
  const sacredHeart = pentecost.clone().add(19, 'days');

  return {
    ashWednesday,
    palmSunday,
    spyWednesday,
    holyThursday,
    goodFriday,
    holySaturday,
    easter,
    mercySunday,
    ascensionThursday,
    pentecost,
    trinitySunday,
    corpusChristi,
    sanguinemqueSunday,
    sacredHeart,
    year,
  };
};

const feastsInYearsToFeastsByDay = feasts => Object.keys(feasts[0]).map(day => ({
  day,
  feasts: feasts.map(d => d[day]),
}));

export {
  yearSpan,
  feastsInYear,
  feastsInYearsToFeastsByDay,
};
