import { expect, test } from 'bun:test';
import { categoryLabel, dateTime } from './format';

test('jam event tetap WITA, apa pun zona waktu HP', () => {
  expect(dateTime('2026-12-12T19:00:00+08:00')).toMatch(/19[.:]00/);
  expect(dateTime('2026-12-12T11:00:00Z')).toMatch(/19[.:]00/);
});

const cats = [{ id: 'a', name: 'Musik' }, { id: 'b', name: 'Festival' }, { id: 'c', name: 'Lomba' }];

test('categoryLabel: urut abjad, 1-2 nama dipisah koma, lebih dari 2 jadi +N', () => {
  expect(categoryLabel(['a'], cats)).toBe('Musik');
  expect(categoryLabel(['a', 'b'], cats)).toBe('Festival, Musik');
  expect(categoryLabel(['a', 'b', 'c'], cats)).toBe('Festival, Lomba +1');
  expect(categoryLabel(['x', 'b'], cats)).toBe('Festival');
});
