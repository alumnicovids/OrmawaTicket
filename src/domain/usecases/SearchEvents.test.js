import { expect, test } from 'bun:test';
import { SearchEvents } from './SearchEvents';
import { EventRepositoryImpl } from '../../data/repositories/EventRepositoryImpl';

const search = (filter) => new SearchEvents(new EventRepositoryImpl()).execute(filter);

test('tanpa filter: semua event', async () => {
  expect(await search()).toHaveLength(5);
});

test('filter ormawa', async () => {
  const r = await search({ ormawaId: 'hima-if' });
  expect(r.map((e) => e.id)).toEqual(['e2', 'e4']);
});

test('cari judul: abaikan huruf besar dan spasi tepi', async () => {
  const r = await search({ query: '  HACKATHON ' });
  expect(r.map((e) => e.id)).toEqual(['e4']);
});

test('ormawa + judul digabung, tidak ada hasil -> kosong', async () => {
  expect(await search({ ormawaId: 'bem', query: 'hackathon' })).toEqual([]);
});
