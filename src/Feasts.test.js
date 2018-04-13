import moment from 'moment-easter'
import { feastsInYear, yearSpan } from './Feasts';

expect.extend({
    toBeDate: (received, year, month, day) => {
        const rxDate = received.toISOString();
        const expectedDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day').toISOString();
        if (rxDate === expectedDate) {
            return {
                message: () =>
                `expected ${rxDate} not to be on ${expectedDate}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                `expected ${rxDate} to be on ${expectedDate}`,
                pass: false,
            };
        }
    }
})

it('should compute year span', () => {
    const answer = yearSpan(2000, 2020);
    expect(answer.length).toBe(21);
});

it('should handle 2017', () => {
    const answer = feastsInYear(2017);
    expect(answer.easter).toBeDate(2017, 4, 16);
    expect(answer.ashWednesday).toBeDate(2017, 3, 1);
    expect(answer.palmSunday).toBeDate(2017, 4, 9);
    expect(answer.spyWednesday).toBeDate(2017, 4, 12);
    expect(answer.holyThursday).toBeDate(2017, 4, 13);
    expect(answer.goodFriday).toBeDate(2017, 4, 14);
    expect(answer.holySaturday).toBeDate(2017, 4, 15);
})

it('should handle 2018', () => {
    const answer = feastsInYear(2018);
    expect(answer.easter).toBeDate(2018, 4, 1);
    expect(answer.ashWednesday).toBeDate(2018, 2, 14);
    expect(answer.palmSunday).toBeDate(2018, 3, 25);
    expect(answer.spyWednesday).toBeDate(2018, 3, 28);
    expect(answer.holyThursday).toBeDate(2018, 3, 29);
    expect(answer.goodFriday).toBeDate(2018, 3, 30);
    expect(answer.holySaturday).toBeDate(2018, 3, 31);
    expect(answer.ascensionThursday).toBeDate(2018, 5, 10);
    expect(answer.pentecost).toBeDate(2018, 5, 20);
})

it('should handle 2019', () => {
    const answer = feastsInYear(2019);
    expect(answer.easter).toBeDate(2019, 4, 21);
    expect(answer.ashWednesday).toBeDate(2019, 3, 6);
    expect(answer.palmSunday).toBeDate(2019, 4, 14);
    expect(answer.spyWednesday).toBeDate(2019, 4, 17);
    expect(answer.holyThursday).toBeDate(2019, 4, 18);
    expect(answer.goodFriday).toBeDate(2019, 4, 19);
    expect(answer.holySaturday).toBeDate(2019, 4, 20);
})
