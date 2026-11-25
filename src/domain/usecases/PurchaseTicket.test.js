import { expect, test } from 'bun:test';
import { PurchaseTicket } from './PurchaseTicket';
import { EventRepositoryImpl } from '../../data/repositories/EventRepositoryImpl';
import { TicketRepositoryImpl } from '../../data/repositories/TicketRepositoryImpl';

const setup = () => {
  const events = new EventRepositoryImpl();
  const tickets = new TicketRepositoryImpl();
  return { events, tickets, buy: new PurchaseTicket(events, tickets) };
};

test('beli berhasil: stok berkurang, tiket tersimpan, total benar', async () => {
  const { events, tickets, buy } = setup();
  const t = await buy.execute({ eventId: 'e1', categoryId: 'vip', quantity: 2 });
  expect(t.totalPrice).toBe(150000);
  expect([t.eventDate, t.eventLocation]).toEqual(['2026-12-12T19:00:00+08:00', 'Aula Utama']);
  expect((await events.getById('e1')).categories[1].stock).toBe(18);
  expect(await tickets.getAll()).toHaveLength(1);
});

test('ditolak: jumlah invalid, stok kurang, event/kategori tidak ada', async () => {
  const { buy } = setup();
  await expect(buy.execute({ eventId: 'e1', categoryId: 'vip', quantity: 0 })).rejects.toThrow();
  await expect(buy.execute({ eventId: 'e1', categoryId: 'vip', quantity: 21 })).rejects.toThrow('Stok');
  await expect(buy.execute({ eventId: 'x', categoryId: 'vip', quantity: 1 })).rejects.toThrow('Event');
  await expect(buy.execute({ eventId: 'e1', categoryId: 'x', quantity: 1 })).rejects.toThrow('Kategori');
});

test('batas stok: beli tepat sisa stok berhasil, tambah satu lagi ditolak', async () => {
  const { events, buy } = setup();
  await buy.execute({ eventId: 'e1', categoryId: 'vip', quantity: 20 });
  expect((await events.getById('e1')).categories[1].stock).toBe(0);
  await expect(buy.execute({ eventId: 'e1', categoryId: 'vip', quantity: 1 })).rejects.toThrow('Stok');
});
