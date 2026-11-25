import { expect, test } from 'bun:test';
import { dateTime } from './format';

test('jam event tetap WITA, apa pun zona waktu HP', () => {
  expect(dateTime('2026-12-12T19:00:00+08:00')).toMatch(/19[.:]00/);
  expect(dateTime('2026-12-12T11:00:00Z')).toMatch(/19[.:]00/);
});
