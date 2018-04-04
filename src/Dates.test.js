import moment from 'moment-easter'
import { datesInYear } from './Dates';

expect.extend({
    toBeDate: (received, year, month, day) => {
        const rxDate = received.toISOString();
        const expectedDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day').toISOString();
        if (rxDate === expectedDate) {
            return {
                message: () =>
                `expected ${received} not to be on ${year}-${month}-${day}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                `expected ${received} to be on ${year}-${month}-${day}`,
                pass: false,
            };
        }
    }
})

it('should handle 2018', () => {
    const answer = datesInYear(2018);
    expect(answer.easter).toBeDate(2018, 4, 1);
    expect(answer.ashWednesday).toBeDate(2018, 2, 14);
    expect(answer.palmSunday).toBeDate(2018, 3, 25);
    expect(answer.spyWednesday).toBeDate(2018, 3, 28);
    expect(answer.holyThursday).toBeDate(2018, 3, 29);
    expect(answer.goodFriday).toBeDate(2018, 3, 30);
    expect(answer.holySaturday).toBeDate(2018, 3, 31);
})
