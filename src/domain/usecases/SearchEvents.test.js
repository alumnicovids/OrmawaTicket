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

test('filter kategori event', async () => {
  const r = await search({ category: 'musik' });
  expect(r.map((e) => e.id)).toEqual(['e1', 'e5']);
});

test('kategori + judul digabung', async () => {
  expect((await search({ category: 'musik', query: 'open mic' })).map((e) => e.id)).toEqual(['e5']);
  expect(await search({ category: 'seminar', query: 'konser' })).toEqual([]);
});
