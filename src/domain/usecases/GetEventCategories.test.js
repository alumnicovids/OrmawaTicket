import { expect, test } from 'bun:test';
import { GetEventCategories } from './GetEventCategories';
import { EventRepositoryImpl } from '../../data/repositories/EventRepositoryImpl';

test('kategori event urut abjad A-Z dan data sumber tidak berubah', async () => {
  const repo = new EventRepositoryImpl();
  const before = (await repo.getCategories()).map((c) => c.name);
  const sorted = (await new GetEventCategories(repo).execute()).map((c) => c.name);
  expect(sorted).toEqual(['Festival', 'Lomba', 'Musik', 'Seminar']);
  expect((await repo.getCategories()).map((c) => c.name)).toEqual(before);
});
