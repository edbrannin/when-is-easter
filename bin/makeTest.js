#!/usr/bin/env node -r esm

/* eslint-disable no-console */

import { feastsInYear } from '../src/Feasts';

const makeTest = (year) => {
  const feasts = feastsInYear(year);
  console.log(`it('should handle ${year}', () => {`);
  console.log(`  const answer = feastsInYear(${year});`);
  Object.keys(feasts).forEach((k) => {
    const v = feasts[k];
    if (k === 'year') {
      console.log(`  expect(answer.year).toBe(${v})`);
    } else {
      console.log(`  expect(answer.${k}).toBeDate(${v.format('YYYY, M, D')});`);
    }
  });
  console.log('});');
  console.log();
};

[2017, 2018, 2019].forEach(makeTest);
