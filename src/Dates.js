import moment from 'moment-easter';

const datesInYear = (year) => {
    const easter = moment().easter(year);
    const ashWednesday = easter.clone().subtract(46, 'days');
    const palmSunday = easter.clone().subtract(7, 'days');
    const spyWednesday = easter.clone().subtract(4, 'days');
    const holyThursday = easter.clone().subtract(3, 'days');
    const goodFriday = easter.clone().subtract(2, 'days');
    const holySaturday = easter.clone().subtract(1, 'day');

    return {
        easter,
        ashWednesday,
        palmSunday,
        spyWednesday,
        holyThursday,
        goodFriday,
        holySaturday,
    }
}

const transposeDates = () => [];

export {
    datesInYear,
    transposeDates,
};
