import { expect, test } from 'bun:test';
import { ticketStatus } from './ticketStatus';

const ticket = { eventDate: '2026-12-12T19:00:00+08:00' };
const at = (iso) => new Date(iso);

test('berlaku sebelum acara dan sampai tepat 24 jam sesudah jam mulai', () => {
  expect(ticketStatus(ticket, at('2026-11-25T00:00:00Z'))).toBe('active');
  expect(ticketStatus(ticket, at('2026-12-12T11:00:00Z'))).toBe('active');
  expect(ticketStatus(ticket, at('2026-12-13T11:00:00Z'))).toBe('active');
});

test('selesai begitu lewat 24 jam sesudah jam mulai', () => {
  expect(ticketStatus(ticket, at('2026-12-13T11:00:01Z'))).toBe('expired');
});
