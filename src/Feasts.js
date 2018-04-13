import moment from 'moment-easter';
import _ from 'lodash';

const yearSpan = (start, end) => _.range(start, end + 1)

const feastsInYear = (year) => {
  // console.log(`Copmuting for year: ${year})`);
    const easter = moment({y: year}).easter();
    const ashWednesday = easter.clone().subtract(46, 'days');
    const palmSunday = easter.clone().subtract(7, 'days');
    const spyWednesday = easter.clone().subtract(4, 'days');
    const holyThursday = easter.clone().subtract(3, 'days');
    const goodFriday = easter.clone().subtract(2, 'days');
    const holySaturday = easter.clone().subtract(1, 'day');
    const mercySunday = easter.clone().add(7, 'days');
    const ascensionThursday = easter.clone().add(39, 'days');
    const pentecost = easter.clone().add(49, 'days');

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
        year,
    }
}

const feastsInYears = (years) => (console.log(`Years: ${years}`) || years || []).map(year => feastsInYear(year));

const feastsInYearsToFeastsByDay = (feasts) => {
    return Object.keys(feasts[0]).map(day => ({
        day,
        feasts: feasts.map(d => d[day])
    }))
};

export {
    yearSpan,
    feastsInYear,
    feastsInYears,
    feastsInYearsToFeastsByDay,
};