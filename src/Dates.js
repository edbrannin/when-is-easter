import moment from 'moment-easter';
import _ from 'lodash';

const yearSpan = (start, end) => _.range(start, end + 1)

const datesInYear = (year) => {
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
        ascensionThursday,
        pentecost,
        year,
    }
}

const datesInYears = (years) => (console.log(`Years: ${years}`) || years || []).map(year => datesInYear(year));

const datesInYearsToDatesByDay = (dates) => {
    return Object.keys(dates[0]).map(day => ({
        day,
        dates: dates.map(d => d[day])
    }))
};

export {
    yearSpan,
    datesInYear,
    datesInYears,
    datesInYearsToDatesByDay,
};
