import moment from 'moment-easter';
import {
  feastsOnDay,
  feastsInYear,
  yearSpan,
  feastsByYearToFeastsOnDay,
} from './Feasts';

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
    }
    return {
      message: () =>
        `expected ${rxDate} to be on ${expectedDate}`,
      pass: false,
    };
  },
});

it('should compute year span', () => {
  const answer = yearSpan(2000, 2020);
  expect(answer).toHaveLength(21);
});

describe('feastsInYear', () => {
  it('should handle 2017', () => {
    const answer = feastsInYear(2017);
    expect(answer.ashWednesday).toBeDate(2017, 3, 1);
    expect(answer.palmSunday).toBeDate(2017, 4, 9);
    expect(answer.spyWednesday).toBeDate(2017, 4, 12);
    expect(answer.holyThursday).toBeDate(2017, 4, 13);
    expect(answer.goodFriday).toBeDate(2017, 4, 14);
    expect(answer.holySaturday).toBeDate(2017, 4, 15);
    expect(answer.easter).toBeDate(2017, 4, 16);
    expect(answer.mercySunday).toBeDate(2017, 4, 23);
    expect(answer.ascensionThursday).toBeDate(2017, 5, 25);
    expect(answer.pentecost).toBeDate(2017, 6, 4);
    expect(answer.trinitySunday).toBeDate(2017, 6, 11);
    expect(answer.corpusChristi).toBeDate(2017, 6, 15);
    expect(answer.sanguinemqueSunday).toBeDate(2017, 6, 18);
    expect(answer.sacredHeart).toBeDate(2017, 6, 23);
    expect(answer.year).toBe(2017);
  });

  it('should handle 2018', () => {
    const answer = feastsInYear(2018);
    expect(answer.ashWednesday).toBeDate(2018, 2, 14);
    expect(answer.palmSunday).toBeDate(2018, 3, 25);
    expect(answer.spyWednesday).toBeDate(2018, 3, 28);
    expect(answer.holyThursday).toBeDate(2018, 3, 29);
    expect(answer.goodFriday).toBeDate(2018, 3, 30);
    expect(answer.holySaturday).toBeDate(2018, 3, 31);
    expect(answer.easter).toBeDate(2018, 4, 1);
    expect(answer.mercySunday).toBeDate(2018, 4, 8);
    expect(answer.ascensionThursday).toBeDate(2018, 5, 10);
    expect(answer.pentecost).toBeDate(2018, 5, 20);
    expect(answer.trinitySunday).toBeDate(2018, 5, 27);
    expect(answer.corpusChristi).toBeDate(2018, 5, 31);
    expect(answer.sanguinemqueSunday).toBeDate(2018, 6, 3);
    expect(answer.sacredHeart).toBeDate(2018, 6, 8);
    expect(answer.year).toBe(2018);
  });

  it('should handle 2019', () => {
    const answer = feastsInYear(2019);
    expect(answer.ashWednesday).toBeDate(2019, 3, 6);
    expect(answer.palmSunday).toBeDate(2019, 4, 14);
    expect(answer.spyWednesday).toBeDate(2019, 4, 17);
    expect(answer.holyThursday).toBeDate(2019, 4, 18);
    expect(answer.goodFriday).toBeDate(2019, 4, 19);
    expect(answer.holySaturday).toBeDate(2019, 4, 20);
    expect(answer.easter).toBeDate(2019, 4, 21);
    expect(answer.mercySunday).toBeDate(2019, 4, 28);
    expect(answer.ascensionThursday).toBeDate(2019, 5, 30);
    expect(answer.pentecost).toBeDate(2019, 6, 9);
    expect(answer.trinitySunday).toBeDate(2019, 6, 16);
    expect(answer.corpusChristi).toBeDate(2019, 6, 20);
    expect(answer.sanguinemqueSunday).toBeDate(2019, 6, 23);
    expect(answer.sacredHeart).toBeDate(2019, 6, 28);
    expect(answer.year).toBe(2019);
  });
});

describe('feastsOnDay', () => {
  it('should filter a year to feasts on the given day', () => {
    const feasts = feastsInYear(2019);
    const answer = feastsOnDay(feasts, '06-28');
    expect(answer).toHaveLength(1);

    const [feastName, feastDate] = answer[0];
    expect(feastName).toBe('sacredHeart');
    expect(feastDate).toBeDate(2019, 6, 28);
  });

  it('should return empty if the date is not present', () => {
    const feasts = feastsInYear(2019);
    const answer = feastsOnDay(feasts, '12-28');
    expect(answer).toHaveLength(0);
  });
});

describe('feastsByYearToFeastsOnDay', () => {
  it("should remove years that don't have an entry for that day", () => {
    const byYear = [2018, 2019].map(feastsInYear);
    const answer = feastsByYearToFeastsOnDay(byYear, '04-14');
    expect(answer).toHaveLength(1);

    const [ feastName, date ] = answer[0];
    expect(feastName).toBe('palmSunday');
    expect(date).toBeDate(2019, 4, 14);
  });
});
